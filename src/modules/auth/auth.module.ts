import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CompareHashService } from 'src/modules/auth/services/compare-hash/compare-password.service';
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';
import { HashStringService } from 'src/modules/auth/services/hash-string/hash-password.service';
import { ValidateDisposableEmailService } from 'src/modules/auth/services/validate-disposable-email/validate-disposable-email.service';

@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [
    ValidateDisposableEmailService,
    CompareHashService,
    CreateSessionService,
    HashStringService,
  ],
  exports: [ValidateDisposableEmailService, HashStringService],
})
export class AuthModule {}
