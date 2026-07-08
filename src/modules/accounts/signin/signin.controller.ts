import { Body, Controller, Delete, Post } from "@nestjs/common";
import { ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { type WorkspaceUserEntity } from "src/domain/entities/workspace-user.entity";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { SigninWithEmailDto } from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.dto";
import { SigninWithEmailService } from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.service";
import { SigninWithGoogleDto } from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.dto";
import { SigninWithGoogleService } from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.service";
import { SignoutService } from "src/modules/accounts/signin/services/signout/signout.service";
import {
  ApiSigninWithEmailDocs,
  ApiSigninWithGoogleDocs,
  ApiSignoutDocs,
} from "src/modules/accounts/signin/signin.docs";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { ProtectedRoute } from "src/shared/decorators/protected-route.decorator";
import { ApiError } from "src/shared/dto/api-error.dto";

@ApiTags("Accounts")
@Controller("accounts/signin")
export class SigninController {
  constructor(
    private readonly signinWithEmailService: SigninWithEmailService,
    private readonly signinWithGoogleDto: SigninWithGoogleService,
    private readonly signoutService: SignoutService,
  ) {}

  @Post("/email")
  @ApiSigninWithEmailDocs()
  public signInWithEmail(@Body() body: SigninWithEmailDto) {
    return this.signinWithEmailService.execute(body);
  }

  @Post("/google")
  @ApiSigninWithGoogleDocs()
  public signInWithGoogle(@Body() body: SigninWithGoogleDto) {
    return this.signinWithGoogleDto.execute(body);
  }

  @Delete()
  @ProtectedRoute()
  @ApiSignoutDocs()
  @ApiUnauthorizedResponse(ApiError(ErrorsMap.AUTH_TOKEN_IS_MISSING))
  public signout(@CurrentUser() loggedUser: WorkspaceUserEntity) {
    return this.signoutService.execute(loggedUser.id);
  }
}
