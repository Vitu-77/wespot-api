import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SigninModule } from "src/modules/accounts/signin/signin.module";
import { CreateSessionUseCase } from "src/modules/accounts/signin/usecases/create-session/create-session.usecase";
import { SignupController } from "src/modules/accounts/signup/controllers/signup.controller";
import { CompleteOnboardingService } from "src/modules/accounts/signup/services/complete-onboarding/complete-onboarding.service";
import { CreateAccountWithEmailService } from "src/modules/accounts/signup/services/create-account-with-email/create-account-with-email.service";
import { CreateAccountWithGoogleService } from "src/modules/accounts/signup/services/create-account-with-google/create-account-with-google.service";
import { ValidateVerificationCodeService } from "src/modules/accounts/signup/services/validate-verification-code/validate-verification-code.service";
import { CreateWorkspaceUseCase } from "src/modules/accounts/signup/usecases/create-workspace/create-workspace.usecase";
import { EnsureAccountCreationUseCase } from "src/modules/accounts/signup/usecases/ensure-account-creation/ensure-account-creation.usecase";
import { SendVerificationCodeUseCase } from "src/modules/accounts/signup/usecases/send-verification-code/send-verification-code.usecase";
import { ValidateDisposableEmailUseCase } from "src/modules/accounts/signup/usecases/validate-disposable-email/validate-disposable-email.usecase";
import { WorkspacesModule } from "src/modules/workspaces/workspaces.module";

@Module({
  imports: [SigninModule, WorkspacesModule],
  controllers: [SignupController],
  providers: [
    JwtService,

    // Services
    CreateSessionUseCase,
    CreateAccountWithEmailService,
    CreateAccountWithGoogleService,
    ValidateVerificationCodeService,
    CompleteOnboardingService,

    // Usecases
    CreateWorkspaceUseCase,
    SendVerificationCodeUseCase,
    EnsureAccountCreationUseCase,
    ValidateDisposableEmailUseCase,
  ],
})
export class SignupModule {}
