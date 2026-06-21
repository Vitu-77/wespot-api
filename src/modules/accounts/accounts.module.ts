import { Module } from '@nestjs/common';
import { CreateUserRepository } from 'src/modules/accounts/repositories/create-user.repository';
import { AccountsController } from 'src/modules/accounts/controllers/accounts.controller';
import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { CreateAccountWithEmailService } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.service';
import { CreateAccountWithGoogleService } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.service';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers: [
    CreateUserRepository,
    GetUserByEmailRepository,
    CreateAccountWithEmailService,
    CreateAccountWithGoogleService,
  ],
})
export class AccountsModule {}
