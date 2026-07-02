import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { env } from 'src/env';
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository';

import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';
import { SigninWithGoogleDto } from 'src/modules/auth/services/signin-with-google/signin-with-google.dto';
import { logger } from 'src/shared/utils/logger';

@Injectable()
export class SigninWithGoogleService {
  private googleOAuthClient = new OAuth2Client(env.GOOGLE_OAUTH_CLIENT_ID);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly createSessionService: CreateSessionService,
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
          'Google account was not found for this provided token',
          {
            description: ErrorCodes.GOOGLE_ACCOUNT_NOT_FOUND,
          },
        );
      }

      if (!payload.email || !payload.name) {
        throw new UnauthorizedException(
          'Google account has no name/email associated',
          {
            description: ErrorCodes.GOOGLE_ACCOUNT_INCOMPLETE,
          },
        );
      }

      const user = await this.userRepository.getByEmail(payload.email);

      if (!user) {
        throw new NotFoundException('User not found with this email', {
          description: ErrorCodes.EMAIL_NOT_FOUND,
        });
      }

      if (user.authProvider === 'EMAIL') {
        throw new NotFoundException('User has login with email', {
          description: ErrorCodes.USER_HAS_LOGIN_WITH_EMAIL,
        });
      }

      if (payload.picture !== user.avatarUrl) {
        user.avatarUrl = payload.picture ?? null;
        await this.userRepository.updateById(user.id, {
          avatarUrl: payload.picture,
        });
      }

      return this.createSessionService.execute(user);
    } catch (error: any) {
      if (error?.response?.error in ErrorCodes) {
        throw error;
      }

      logger.error(error);

      throw new BadRequestException('Invalid google token', {
        description: ErrorCodes.INVALID_GOOGLE_TOKEN,
      });
    }
  }
}
