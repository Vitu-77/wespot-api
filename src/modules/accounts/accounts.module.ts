import { Module } from '@nestjs/common';
import { CreateUserRepository } from 'src/modules/accounts/repositories/create-user.repository';
import { AccountsController } from 'src/modules/accounts/controllers/accounts.controller';
import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { CreateAccountWithEmailService } from 'src/modules/accounts/services/create-account-with-email/create-account-with-email.service';
import { CreateAccountWithGoogleService } from 'src/modules/accounts/services/create-account-with-google/create-account-with-google.service';
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AccountsController],
  providers: [
    JwtService,

    CreateSessionService,
    CreateUserRepository,
    GetUserByEmailRepository,
    CreateAccountWithEmailService,
    CreateAccountWithGoogleService,
  ],
})
export class AccountsModule {}
