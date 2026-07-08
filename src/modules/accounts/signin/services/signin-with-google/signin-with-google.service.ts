/** biome-ignore-all lint/suspicious/noExplicitAny: error must be any */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { env } from "src/env";
import { UserRepository } from "src/infra/database/repositories/user-repository/user.repository";
import { SigninWithGoogleDto } from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.dto";
import { CreateSessionUseCase } from "src/modules/accounts/signin/usecases/create-session/create-session.usecase";
import { logger } from "src/shared/utils/logger";

@Injectable()
export class SigninWithGoogleService {
  private googleOAuthClient = new OAuth2Client(env.GOOGLE_OAUTH_CLIENT_ID);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly createSessionUseCase: CreateSessionUseCase,
  ) {}

  async execute({ googleIdToken }: SigninWithGoogleDto) {
    try {
      const ticket = await this.googleOAuthClient.verifyIdToken({
        idToken: googleIdToken,
        audience: env.GOOGLE_OAUTH_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new UnauthorizedException(
          SigninWithGoogleService.errors.GOOGLE_ACCOUNT_NOT_FOUND,
        );
      }

      if (!payload.email || !payload.name) {
        throw new UnauthorizedException(
          SigninWithGoogleService.errors.GOOGLE_ACCOUNT_INCOMPLETE,
        );
      }

      const user = await this.userRepository.getByEmail(payload.email);

      if (!user) {
        throw new NotFoundException(
          SigninWithGoogleService.errors.EMAIL_NOT_FOUND,
        );
      }

      if (user.authProvider === "EMAIL") {
        throw new NotFoundException(
          SigninWithGoogleService.errors.USER_HAS_LOGIN_WITH_EMAIL,
        );
      }

      if (payload.picture !== user.avatarUrl) {
        user.avatarUrl = payload.picture ?? null;

        await this.userRepository.updateById(user.id, {
          avatarUrl: payload.picture,
        });
      }

      return this.createSessionUseCase.execute(user);
    } catch (error: any) {
      if (error?.response?.error) {
        throw error;
      }

      logger.error(error);

      throw new BadRequestException(
        SigninWithGoogleService.errors.INVALID_GOOGLE_TOKEN,
      );
    }
  }

  static errors = {
    GOOGLE_ACCOUNT_NOT_FOUND: ErrorsMap.GOOGLE_ACCOUNT_NOT_FOUND,
    GOOGLE_ACCOUNT_INCOMPLETE: ErrorsMap.GOOGLE_ACCOUNT_INCOMPLETE,
    EMAIL_NOT_FOUND: ErrorsMap.EMAIL_NOT_FOUND,
    USER_HAS_LOGIN_WITH_EMAIL: ErrorsMap.USER_HAS_LOGIN_WITH_EMAIL,
    INVALID_GOOGLE_TOKEN: ErrorsMap.INVALID_GOOGLE_TOKEN,
  };
}
