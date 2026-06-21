import { Module } from '@nestjs/common';
import { AccountsController } from 'src/modules/accounts/controllers/accounts.controller';
import { ValidateDisposableEmailService } from 'src/modules/auth/services/validate-disposable-email/validate-disposable-email.service';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers: [ValidateDisposableEmailService],
})
export class AccountsModule {}
