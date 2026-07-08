import { Body, Controller, Delete, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { type WorkspaceUserEntity } from "src/domain/entities/workspace-user.entity";
import { ErrorCodes } from "src/domain/exceptions/error-codes.enum";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import {
  SigninWithEmailDto,
  SigninWithEmailResponseDto,
} from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.dto";
import { SigninWithEmailService } from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.service";
import {
  SigninWithGoogleDto,
  SigninWithGoogleResponseDto,
} from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.dto";
import { SigninWithGoogleService } from "src/modules/accounts/signin/services/signin-with-google/signin-with-google.service";
import { SignoutService } from "src/modules/accounts/signin/services/signout/signout.service";
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
  @ApiOperation({
    summary: "Sign in with email",
    description: "Authenticates a user using an email address and password.",
  })
  @ApiBody({
    type: SigninWithEmailDto,
  })
  @ApiCreatedResponse({
    description: "User successfully authenticated.",
    type: SigninWithEmailResponseDto,
  })
  @ApiNotFoundResponse(ApiError(SigninWithEmailService.errors.EMAIL_NOT_FOUND))
  @ApiUnauthorizedResponse(
    ApiError(SigninWithEmailService.errors.PASSWORDS_DO_NOT_MATCH),
  )
  public signInWithEmail(@Body() body: SigninWithEmailDto) {
    return this.signinWithEmailService.execute(body);
  }

  @Post("/google")
  @ApiOperation({
    summary: "Sign in with Google",
    description: "Authenticates a user using a Google ID Token.",
  })
  @ApiBody({
    type: SigninWithGoogleDto,
  })
  @ApiCreatedResponse({
    description: "User successfully authenticated.",
    type: SigninWithGoogleResponseDto,
  })
  @ApiNotFoundResponse({
    description: "The requested resource was not found.",
    content: {
      "application/json": {
        examples: {
          [ErrorCodes.EMAIL_NOT_FOUND]: {
            summary: "Email not found",
            value: ApiError(SigninWithGoogleService.errors.EMAIL_NOT_FOUND),
          },
          [ErrorCodes.USER_HAS_LOGIN_WITH_EMAIL]: {
            summary: "Account uses email authentication",
            value: ApiError(
              SigninWithGoogleService.errors.USER_HAS_LOGIN_WITH_EMAIL,
            ),
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Authentication failed.",
    content: {
      "application/json": {
        examples: {
          [ErrorCodes.GOOGLE_ACCOUNT_NOT_FOUND]: {
            summary: "Google account not found",
            value: ApiError(
              SigninWithGoogleService.errors.GOOGLE_ACCOUNT_NOT_FOUND,
            ),
          },
          [ErrorCodes.GOOGLE_ACCOUNT_INCOMPLETE]: {
            summary: "Google account incomplete",
            value: ApiError(
              SigninWithGoogleService.errors.GOOGLE_ACCOUNT_INCOMPLETE,
            ),
          },
        },
      },
    },
  })
  @ApiBadRequestResponse(
    ApiError(SigninWithGoogleService.errors.INVALID_GOOGLE_TOKEN),
  )
  public signInWithGoogle(@Body() body: SigninWithGoogleDto) {
    return this.signinWithGoogleDto.execute(body);
  }

  @Delete()
  @ProtectedRoute()
  @ApiOperation({
    summary: "Sign out",
    description: "Invalidates the current authenticated session.",
  })
  @ApiNoContentResponse({
    description: "User successfully signed out.",
  })
  @ApiUnauthorizedResponse(ApiError(ErrorsMap.AUTH_TOKEN_IS_MISSING))
  public signout(@CurrentUser() loggedUser: WorkspaceUserEntity) {
    return this.signoutService.execute(loggedUser.id);
  }
}
