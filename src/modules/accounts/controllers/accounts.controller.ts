import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateAccountWithEmailDto } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.dto';
import { CreateAccountWithEmailService } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.service';
import { CreateAccountWithGoogleDto } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.dto';
import { CreateAccountWithGoogleService } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.service';
import { ValidateAccountEmailDto } from 'src/modules/accounts/services/validate-account-email/validate-account-email.dto';
import { ValidateAccountEmailService } from 'src/modules/accounts/services/validate-account-email/validate-account-email.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createAccountWithEmailService: CreateAccountWithEmailService,
    private readonly createAccountWithGoogleService: CreateAccountWithGoogleService,
    private readonly validateAccountEmailService: ValidateAccountEmailService,
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
  validateEmail(@Body() body: ValidateAccountEmailDto) {
    return this.validateAccountEmailService.execute(body);
  }
}
