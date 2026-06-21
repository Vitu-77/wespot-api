import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { env } from 'src/env';
import { AuthService } from 'src/infra/tokens/tokens.service';

import { CreateUserRepository } from 'src/modules/accounts/repositories/create-user.repository';
import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { CreateAccountWithGoogleDto } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.dto';
import { logger } from 'src/shared/utils/logger';

@Injectable()
export class CreateAccountWithGoogleService {
  private googleOAuthClient = new OAuth2Client(env.GOOGLE_OAUTH_CLIENT_ID);

  constructor(
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
  ) {}

  async execute(data: CreateAccountWithGoogleDto) {
    try {
      const ticket = await this.googleOAuthClient.verifyIdToken({
        idToken: data.googleIdToken,
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

      const user = await this.getUserByEmailRepository.execute(payload.email);

      console.log(payload);
      console.log(user);

      if (user) {
        if (user.authProvider === 'GOOGLE') {
          // Efetuar login e retornar tokens
        }

        if (user.authProvider === 'EMAIL') {
          throw new ConflictException('Provided email is taken', {
            description: ErrorCodes.EMAIL_ALREADY_REGISTERED_WITH_PASSWORD,
          });
        }
      }

      const newUser = await this.createUserRepository.execute({
        authProvider: 'GOOGLE',
        authProviderId: payload.sub,
        name: payload.name,
        avatarUrl: payload.picture,
        email: payload.email,
      });

      const { accessToken } = this.authService.createAuthTokens(newUser);
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
