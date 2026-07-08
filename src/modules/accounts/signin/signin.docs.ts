import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ErrorCodes } from "src/domain/exceptions/error-codes.enum";
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
import { ApiError } from "src/shared/dto/api-error.dto";

export function ApiSigninWithEmailDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Sign in with email",
      description: "Authenticates a user using an email address and password.",
    }),
    ApiBody({
      type: SigninWithEmailDto,
    }),
    ApiCreatedResponse({
      description: "User successfully authenticated.",
      type: SigninWithEmailResponseDto,
    }),
    ApiNotFoundResponse(
      ApiError(SigninWithEmailService.errors.EMAIL_NOT_FOUND),
    ),
    ApiUnauthorizedResponse(
      ApiError(SigninWithEmailService.errors.PASSWORDS_DO_NOT_MATCH),
    ),
  );
}

export function ApiSigninWithGoogleDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Sign in with Google",
      description: "Authenticates a user using a Google ID Token.",
    }),
    ApiBody({
      type: SigninWithGoogleDto,
    }),
    ApiCreatedResponse({
      description: "User successfully authenticated.",
      type: SigninWithGoogleResponseDto,
    }),
    ApiNotFoundResponse({
      description: "The requested resource was not found.",
      content: {
        "application/json": {
          examples: {
            [ErrorCodes.EMAIL_NOT_FOUND]: {
              summary: "Email not found",
              value: ApiError(SigninWithGoogleService.errors.EMAIL_NOT_FOUND),
            },
            [ErrorCodes.GOOGLE_ACCOUNT_NOT_FOUND]: {
              summary: "Google account not found",
              value: ApiError(
                SigninWithGoogleService.errors.GOOGLE_ACCOUNT_NOT_FOUND,
              ),
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
    }),
    ApiUnauthorizedResponse(
      ApiError(SigninWithGoogleService.errors.GOOGLE_ACCOUNT_INCOMPLETE),
    ),
    ApiBadRequestResponse(
      ApiError(SigninWithGoogleService.errors.INVALID_GOOGLE_TOKEN),
    ),
  );
}

export function ApiSignoutDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Sign out",
      description: "Invalidates the current authenticated session.",
    }),
    ApiNoContentResponse({
      description: "User successfully signed out.",
    }),
  );
}
