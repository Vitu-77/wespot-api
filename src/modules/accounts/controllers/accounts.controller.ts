import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CompleteOnboardingDto } from 'src/modules/accounts/services/complete-onboarding/create-account.dto';
import { CompleteOnboardingService } from 'src/modules/accounts/services/complete-onboarding/create-account.service';
import { CreateAccountWithEmailDto } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.dto';
import { CreateAccountWithEmailService } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.service';
import { CreateAccountWithGoogleDto } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.dto';
import { CreateAccountWithGoogleService } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.service';
import { ValidateVerificationCodeDto } from 'src/modules/accounts/services/validate-verification-code/validate-verification-code.dto';
import { ValidateVerificationCodeService } from 'src/modules/accounts/services/validate-verification-code/validate-verification-code.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createAccountWithEmailService: CreateAccountWithEmailService,
    private readonly createAccountWithGoogleService: CreateAccountWithGoogleService,
    private readonly validateVerificationCodeService: ValidateVerificationCodeService,
    private readonly completeOnboardingService: CompleteOnboardingService,
  ) {}

  @Post('/signup/email')
  signUpWithEmail(@Body() body: CreateAccountWithEmailDto) {
    return this.createAccountWithEmailService.execute(body);
  }

  @Post('/signup/google')
  signUpWithGoogle(@Body() body: CreateAccountWithGoogleDto) {
    return this.createAccountWithGoogleService.execute(body);
  }

  @Patch('/validate-email')
  verifyEmail(@Body() body: ValidateVerificationCodeDto) {
    return this.validateVerificationCodeService.execute(body);
  }

  @Post('/onboarding')
  completeOnboarding(@Body() body: CompleteOnboardingDto) {
    return this.completeOnboardingService.execute(body);
  }
}
