import { Body, Controller, Delete, Post } from "@nestjs/common";
import { type WorkspaceUserEntity } from "src/domain/entities/workspace-user.entity";
import { SigninWithEmailDto } from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.dto";
import { SigninWithEmailService } from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.service";
import { SigninWithGoogleDto } from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.dto";
import { SigninWithGoogleService } from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.service";
import { SignoutService } from "src/modules/accounts/signin/services/signout/signout.service";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { ProtectedRoute } from "src/shared/decorators/protected-route.decorator";

@Controller("accounts/signin")
export class SigninController {
  constructor(
    private readonly signinWithEmailService: SigninWithEmailService,
    private readonly signinWithGoogleDto: SigninWithGoogleService,
    private readonly signoutService: SignoutService,
  ) {}

  @Post("/email")
  signInWithEmail(@Body() body: SigninWithEmailDto) {
    return this.signinWithEmailService.execute(body);
  }

  @Post("/google")
  signInWithGoogle(@Body() body: SigninWithGoogleDto) {
    return this.signinWithGoogleDto.execute(body);
  }

  @ProtectedRoute()
  @Delete("/")
  signout(@CurrentUser() loggedUser: WorkspaceUserEntity) {
    return this.signoutService.execute(loggedUser.id);
  }
}
