import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';

import { CreateUserRepository } from 'src/modules/accounts/repositories/create-user.repository';
import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { CreateAccountWithEmailDto } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.dto';
import { EnsureAccountCreationService } from 'src/modules/accounts/services/ensure-account-creation/ensure-account-creation.service';
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';
import { ValidateDisposableEmailService } from 'src/modules/accounts/services/validate-disposable-email/validate-disposable-email.service';
import { ArgonService } from 'src/infra/argon/argon.service';

@Injectable()
export class CreateAccountWithEmailService {
  constructor(
    private readonly argonService: ArgonService,
    private readonly createSessionService: CreateSessionService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly validateDisposableEmailService: ValidateDisposableEmailService,
    private readonly ensureAccountCreationService: EnsureAccountCreationService,
  ) {}

  async execute(data: CreateAccountWithEmailDto) {
    if (data.password !== data.passwordConfirmation) {
      throw new BadRequestException('Passwords dont match', {
        description: ErrorCodes.PASSWORDS_DO_NOT_MATCH,
      });
    }

    await this.validateDisposableEmailService.execute(data.email);
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

    await this.ensureAccountCreationService.execute(data.fingerprintId);
    const newUser = await this.createUserRepository.execute({
      ...data,
      emailValidated: false,
      authProvider: 'EMAIL',
      password: await this.argonService.hashString(data.password),
      fingerprint: data.fingerprintId,
    });

    return this.createSessionService.execute(newUser);
  }
}
