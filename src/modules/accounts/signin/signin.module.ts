import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "src/modules/accounts/signin/guards/auth.guard";
import { CreateSessionService } from "src/modules/accounts/signin/services/create-session/create-session.service";
import { SigninWithEmailService } from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.service";
import { SigninWithGoogleService } from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.service";
import { SignoutService } from "src/modules/accounts/signin/services/signout/signout.service";
import { SigninController } from "src/modules/accounts/signin/signin.controller";

@Module({
  imports: [JwtModule.register({})],
  controllers: [SigninController],
  providers: [
    SignoutService,
    CreateSessionService,
    SigninWithEmailService,
    SigninWithGoogleService,
    AuthGuard,
  ],
  exports: [AuthGuard, JwtModule],
})
export class SigninModule {}
