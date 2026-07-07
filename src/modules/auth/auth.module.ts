import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from 'src/modules/auth/controllers/auth.controller'
import { AuthGuard } from 'src/modules/auth/guards/auth.guard'
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service'
import { SigninWithEmailService } from 'src/modules/auth/services/signin-with-email/signin-with-email.service'
import { SigninWithGoogleService } from 'src/modules/auth/services/signin-with-google/signin-with-google.service'
import { SignoutService } from 'src/modules/auth/services/signout/signout.service'

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    SignoutService,
    CreateSessionService,
    SigninWithEmailService,
    SigninWithGoogleService,
    AuthGuard,
  ],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
