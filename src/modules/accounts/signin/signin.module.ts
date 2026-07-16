import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SigninController } from "src/modules/accounts/signin/controllers/signin.controller";
import { AuthGuard } from "src/modules/accounts/signin/guards/auth.guard";
import { SigninWithEmailService } from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.service";
import { SigninWithGoogleService } from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.service";
import { SignoutService } from "src/modules/accounts/signin/services/signout/signout.service";
import { CreateSessionUseCase } from "src/modules/accounts/signin/usecases/create-session/create-session.usecase";

@Module({
  imports: [JwtModule.register({})],
  controllers: [SigninController],
  providers: [
    SignoutService,
    CreateSessionUseCase,
    SigninWithEmailService,
    SigninWithGoogleService,
    AuthGuard,
  ],
  exports: [AuthGuard, JwtModule],
})
export class SigninModule {}
