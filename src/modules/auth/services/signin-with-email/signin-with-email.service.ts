import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { ArgonService } from 'src/infra/argon/argon.service';

import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';
import { SigninWithEmailDto } from 'src/modules/auth/services/signin-with-email/signin-with-email.dto';

@Injectable()
export class SigninWithEmailService {
  constructor(
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly createSessionService: CreateSessionService,
    private readonly argonService: ArgonService,
  ) {}

  async execute({ email, password }: SigninWithEmailDto) {
    const user = await this.getUserByEmailRepository.execute(email);

    if (!user) {
      throw new NotFoundException('User not found with this email', {
        description: ErrorCodes.EMAIL_NOT_FOUND,
      });
    }

    if (user.authProvider === 'GOOGLE') {
      return this.createSessionService.execute(user);
    }

    const userPassword = user.password as string;
    const passwordMatch = await this.argonService.compareHash(
      userPassword,
      password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Password do not match', {
        description: ErrorCodes.PASSWORDS_DO_NOT_MATCH,
      });
    }

    return this.createSessionService.execute(user);
  }
}
