import { Body, Controller, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompleteOnboardingDto } from "src/modules/accounts/signup/services/complete-onboarding/complete-onboarding.dto";
import { CompleteOnboardingService } from "src/modules/accounts/signup/services/complete-onboarding/complete-onboarding.service";
import { CreateAccountWithEmailDto } from "src/modules/accounts/signup/services/create-account-with-email/create-account-with-email.dto";
import { CreateAccountWithEmailService } from "src/modules/accounts/signup/services/create-account-with-email/create-account-with-email.service";
import { CreateAccountWithGoogleDto } from "src/modules/accounts/signup/services/create-account-with-google/create-account-with-google.dto";
import { CreateAccountWithGoogleService } from "src/modules/accounts/signup/services/create-account-with-google/create-account-with-google.service";
import { ValidateVerificationCodeDto } from "src/modules/accounts/signup/services/validate-verification-code/validate-verification-code.dto";
import { ValidateVerificationCodeService } from "src/modules/accounts/signup/services/validate-verification-code/validate-verification-code.service";
import {
  ApiCreateAccountWithEmailDocs,
  ApiCreateAccountWithGoogleDocs,
  ApiSignUpCompleteOnboardingDocs,
  ApiValidateVerificationCodeDocs,
} from "src/modules/accounts/signup/signup.docs";

@ApiTags("Accounts ⌁ SignUp")
@Controller("accounts/signup")
export class SignupController {
  constructor(
    private readonly createAccountWithEmailService: CreateAccountWithEmailService,
    private readonly createAccountWithGoogleService: CreateAccountWithGoogleService,
    private readonly validateVerificationCodeService: ValidateVerificationCodeService,
    private readonly completeOnboardingService: CompleteOnboardingService,
  ) {}

  @Post("/email")
  @ApiCreateAccountWithEmailDocs()
  signUpWithEmail(@Body() body: CreateAccountWithEmailDto) {
    return this.createAccountWithEmailService.execute(body);
  }

  @Post("/google")
  @ApiCreateAccountWithGoogleDocs()
  signUpWithGoogle(@Body() body: CreateAccountWithGoogleDto) {
    return this.createAccountWithGoogleService.execute(body);
  }

  @Patch("/validate-email")
  @ApiValidateVerificationCodeDocs()
  validateEmailWithCode(@Body() body: ValidateVerificationCodeDto) {
    return this.validateVerificationCodeService.execute(body);
  }

  @Post("/onboarding")
  @ApiSignUpCompleteOnboardingDocs()
  completeOnboarding(@Body() body: CompleteOnboardingDto) {
    return this.completeOnboardingService.execute(body);
  }
}
