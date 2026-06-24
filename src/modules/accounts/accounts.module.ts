import { Module } from '@nestjs/common';
import { CreateUserRepository } from 'src/modules/accounts/repositories/create-user.repository';
import { AccountsController } from 'src/modules/accounts/controllers/accounts.controller';
import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { CreateAccountWithEmailService } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.service';
import { CreateAccountWithGoogleService } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.service';
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth/auth.module';
import { SendVerificationCodeService } from 'src/modules/accounts/services/send-verification-code/send-verification-code.service';
import { UpdateUserRepository } from 'src/modules/accounts/repositories/update-user.repository';
import { ValidateVerificationCodeService } from 'src/modules/accounts/services/validate-verification-code/validate-verification-code.service';
import { EnsureAccountCreationService } from 'src/modules/accounts/services/ensure-account-creation/ensure-account-creation.service';
import { ValidateDisposableEmailService } from 'src/modules/accounts/services/validate-disposable-email/validate-disposable-email.service';

@Module({
  imports: [AuthModule],
  controllers: [AccountsController],
  providers: [
    JwtService,

    CreateUserRepository,
    UpdateUserRepository,
    GetUserByEmailRepository,

    CreateSessionService,
    CreateAccountWithEmailService,
    CreateAccountWithGoogleService,
    SendVerificationCodeService,
    ValidateVerificationCodeService,
    EnsureAccountCreationService,
    ValidateDisposableEmailService,
  ],
})
export class AccountsModule {}
