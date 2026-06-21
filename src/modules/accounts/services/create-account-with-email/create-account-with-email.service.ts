import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';

import { AuthService } from 'src/infra/tokens/tokens.service';
import { CreateUserRepository } from 'src/modules/accounts/repositories/create-user.repository';
import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { CreateAccountWithEmailDto } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.dto';

@Injectable()
export class CreateAccountWithEmailService {
  constructor(
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
  ) {}

  async execute(data: CreateAccountWithEmailDto) {
    if (data.password !== data.passwordConfirmation) {
      throw new BadRequestException('Passwords dont match', {
        description: ErrorCodes.PASSWORDS_DO_NOT_MATCH,
      });
    }

    await this.authService.validateDisposableEmail(data.email);
    const user = await this.getUserByEmailRepository.execute(data.email);

    if (user) {
      if (user.authProvider === 'EMAIL') {
        throw new ConflictException('Provided email is taken', {
          description: ErrorCodes.EMAIL_ALREADY_IN_USE,
        });
      }

      if (user.authProvider === 'GOOGLE') {
        throw new ConflictException('Account is created with google', {
          description: ErrorCodes.EMAIL_ALREADY_REGISTERED_WITH_GOOGLE,
        });
      }
    }

    return this.createUserRepository.execute({
      ...data,
      authProvider: 'EMAIL',
      password: await this.authService.encrypt(data.password),
    });
  }
}
