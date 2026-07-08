/** biome-ignore-all lint/suspicious/noExplicitAny: Error could be anything */
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { env } from "src/env";
import { UserRepository } from "src/infra/database/repositories/user-repository/user.repository";
import { CreateSessionUseCase } from "src/modules/accounts/signin/usecases/create-session/create-session.usecase";
import { CreateAccountWithGoogleDto } from "src/modules/accounts/signup/services/create-account-with-google/create-account-with-google.dto";
import { EnsureAccountCreationUseCase } from "src/modules/accounts/signup/usecases/ensure-account-creation/ensure-account-creation.usecase";
import { SendVerificationCodeUseCase } from "src/modules/accounts/signup/usecases/send-verification-code/send-verification-code.usecase";
import { logger } from "src/shared/utils/logger";

@Injectable()
export class CreateAccountWithGoogleService {
  private googleOAuthClient = new OAuth2Client(env.GOOGLE_OAUTH_CLIENT_ID);

  constructor(
    private readonly sendVerificationCodeUseCase: SendVerificationCodeUseCase,
    private readonly userRepository: UserRepository,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly ensureAccountCreationUseCase: EnsureAccountCreationUseCase,
  ) {}

  async execute(data: CreateAccountWithGoogleDto) {
    try {
      const ticket = await this.googleOAuthClient.verifyIdToken({
        idToken: data.googleIdToken,
        audience: env.GOOGLE_OAUTH_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new NotFoundException(
          CreateAccountWithGoogleService.errors.GOOGLE_ACCOUNT_NOT_FOUND,
        );
      }

      if (!payload.email || !payload.name) {
        throw new UnauthorizedException(
          CreateAccountWithGoogleService.errors.GOOGLE_ACCOUNT_INCOMPLETE,
        );
      }

      const user = await this.userRepository.getByEmail(payload.email);

      if (user) {
        if (user.authProvider === "GOOGLE") {
          return this.createSessionUseCase.execute(user);
        }

        if (user.authProvider === "EMAIL") {
          throw new ConflictException(
            CreateAccountWithGoogleService.errors
              .EMAIL_ALREADY_REGISTERED_WITH_PASSWORD,
          );
        }
      }

      await this.ensureAccountCreationUseCase.execute(data.fingerprintId);

      await this.sendVerificationCodeUseCase.execute({
        email: payload.email,
        name: payload.name,
      });

      const newUser = await this.userRepository.create({
        authProvider: "GOOGLE",
        authProviderId: payload.sub,
        name: payload.name,
        avatarUrl: payload.picture,
        email: payload.email,
        emailValidated: false,
        fingerprint: data.fingerprintId,
      });

      return this.createSessionUseCase.execute(newUser);
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      logger.error(error);

      throw new BadRequestException(
        CreateAccountWithGoogleService.errors.INVALID_GOOGLE_TOKEN,
      );
    }
  }

  static errors = {
    GOOGLE_ACCOUNT_NOT_FOUND: ErrorsMap.GOOGLE_ACCOUNT_NOT_FOUND,
    GOOGLE_ACCOUNT_INCOMPLETE: ErrorsMap.GOOGLE_ACCOUNT_INCOMPLETE,
    EMAIL_ALREADY_REGISTERED_WITH_PASSWORD:
      ErrorsMap.EMAIL_ALREADY_REGISTERED_WITH_PASSWORD,
    INVALID_GOOGLE_TOKEN: ErrorsMap.INVALID_GOOGLE_TOKEN,
  };
}
