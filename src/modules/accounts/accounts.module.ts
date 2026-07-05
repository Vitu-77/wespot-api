import { Module } from '@nestjs/common';
import { AccountsController } from 'src/modules/accounts/controllers/accounts.controller';
import { CreateAccountWithEmailService } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.service';
import { CreateAccountWithGoogleService } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.service';
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth/auth.module';
import { SendVerificationCodeService } from 'src/modules/accounts/services/send-verification-code/send-verification-code.service';
import { ValidateVerificationCodeService } from 'src/modules/accounts/services/validate-verification-code/validate-verification-code.service';
import { EnsureAccountCreationService } from 'src/modules/accounts/services/ensure-account-creation/ensure-account-creation.service';
import { ValidateDisposableEmailService } from 'src/modules/accounts/services/validate-disposable-email/validate-disposable-email.service';
import { CompleteOnboardingService } from 'src/modules/accounts/services/complete-onboarding/create-account.service';
import { WorkspacesModule } from 'src/modules/workspaces/workspaces.module';

@Module({
  imports: [AuthModule, WorkspacesModule],
  controllers: [AccountsController],
  providers: [
    JwtService,

    CreateSessionService,
    CreateAccountWithEmailService,
    CreateAccountWithGoogleService,
    SendVerificationCodeService,
    ValidateVerificationCodeService,
    EnsureAccountCreationService,
    ValidateDisposableEmailService,
    CompleteOnboardingService,
  ],
})
export class AccountsModule {}
