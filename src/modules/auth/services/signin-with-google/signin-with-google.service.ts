import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { env } from 'src/env';

import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';
import { SigninWithGoogleDto } from 'src/modules/auth/services/signin-with-google/signin-with-google.dto';

@Injectable()
export class SigninWithGoogleService {
  private googleOAuthClient = new OAuth2Client(env.GOOGLE_OAUTH_CLIENT_ID);

  constructor(
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly createSessionService: CreateSessionService,
  ) {}

  async execute({ googleIdToken }: SigninWithGoogleDto) {
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

    const user = await this.getUserByEmailRepository.execute(payload.email);

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

    return this.createSessionService.execute(user);
  }
}
