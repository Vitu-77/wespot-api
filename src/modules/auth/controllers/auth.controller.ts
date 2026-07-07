import { Body, Controller, Delete, Post } from '@nestjs/common'
import { SigninWithEmailDto } from 'src/modules/auth/services/signin-with-email/signin-with-email.dto'
import { SigninWithEmailService } from 'src/modules/auth/services/signin-with-email/signin-with-email.service'
import { SigninWithGoogleDto } from 'src/modules/auth/services/signin-with-google/signin-with-google.dto'
import { SigninWithGoogleService } from 'src/modules/auth/services/signin-with-google/signin-with-google.service'
import { SignoutDto } from 'src/modules/auth/services/signout/signout.dto'
import { SignoutService } from 'src/modules/auth/services/signout/signout.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinWithEmailService: SigninWithEmailService,
    private readonly signinWithGoogleDto: SigninWithGoogleService,
    private readonly signoutService: SignoutService,
  ) {}

  @Post('/signin/email')
  signInWithEmail(@Body() body: SigninWithEmailDto) {
    return this.signinWithEmailService.execute(body);
  }

  @Post('/signin/google')
  signInWithGoogle(@Body() body: SigninWithGoogleDto) {
    return this.signinWithGoogleDto.execute(body);
  }

  @Delete('/signout')
  signout(@Body() body: SignoutDto) {
    return this.signoutService.execute(body);
  }
}
