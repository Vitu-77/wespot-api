import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ErrorCodes } from "src/domain/exceptions/error-codes.enum";
import {
  CompleteOnboardingDto,
  CompleteOnboardingResponseDto,
} from "src/modules/accounts/signup/services/complete-onboarding/complete-onboarding.dto";
import { CompleteOnboardingService } from "src/modules/accounts/signup/services/complete-onboarding/complete-onboarding.service";
import {
  CreateAccountWithEmailDto,
  CreateAccountWithEmailResponseDto,
} from "src/modules/accounts/signup/services/create-account-with-email/create-account-with-email.dto";
import { CreateAccountWithEmailService } from "src/modules/accounts/signup/services/create-account-with-email/create-account-with-email.service";
import {
  CreateAccountWithGoogleDto,
  CreateAccountWithGoogleResponseDto,
} from "src/modules/accounts/signup/services/create-account-with-google/create-account-with-google.dto";
import { CreateAccountWithGoogleService } from "src/modules/accounts/signup/services/create-account-with-google/create-account-with-google.service";
import {
  ValidateVerificationCodeDto,
  ValidateVerificationCodeResponseDto,
} from "src/modules/accounts/signup/services/validate-verification-code/validate-verification-code.dto";
import { ValidateVerificationCodeService } from "src/modules/accounts/signup/services/validate-verification-code/validate-verification-code.service";
import { ApiError } from "src/shared/dto/api-error.dto";

export function ApiCreateAccountWithEmailDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Create account with email",
      description:
        "Creates a new account using an email address and password, sends a verification code to the user's email, and creates an authenticated session.",
    }),
    ApiBody({
      type: CreateAccountWithEmailDto,
    }),
    ApiOkResponse({
      description: "Account successfully created.",
      type: CreateAccountWithEmailResponseDto,
    }),
    ApiUnauthorizedResponse(
      ApiError(CreateAccountWithEmailService.errors.PASSWORDS_DO_NOT_MATCH),
    ),
    ApiConflictResponse({
      description: "The account could not be created.",
      content: {
        "application/json": {
          examples: {
            [ErrorCodes.EMAIL_ALREADY_IN_USE]: {
              summary: "Email already in use",
              value: ApiError(
                CreateAccountWithEmailService.errors.EMAIL_ALREADY_IN_USE,
              ),
            },
            [ErrorCodes.EMAIL_ALREADY_REGISTERED_WITH_GOOGLE]: {
              summary: "Email already registered with Google",
              value: ApiError(
                CreateAccountWithEmailService.errors
                  .EMAIL_ALREADY_REGISTERED_WITH_GOOGLE,
              ),
            },
          },
        },
      },
    }),
  );
}

export function ApiCreateAccountWithGoogleDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Create account with Google",
      description:
        "Creates a new account using a Google account. If the user already exists with Google authentication, a new session is created instead.",
    }),
    ApiBody({
      type: CreateAccountWithGoogleDto,
    }),
    ApiOkResponse({
      description: "Account successfully created or authenticated.",
      type: CreateAccountWithGoogleResponseDto,
    }),
    ApiBadRequestResponse(
      ApiError(CreateAccountWithGoogleService.errors.INVALID_GOOGLE_TOKEN),
    ),
    ApiNotFoundResponse(
      ApiError(CreateAccountWithGoogleService.errors.GOOGLE_ACCOUNT_NOT_FOUND),
    ),
    ApiUnauthorizedResponse(
      ApiError(CreateAccountWithGoogleService.errors.GOOGLE_ACCOUNT_INCOMPLETE),
    ),
    ApiConflictResponse(
      ApiError(
        CreateAccountWithGoogleService.errors
          .EMAIL_ALREADY_REGISTERED_WITH_PASSWORD,
      ),
    ),
  );
}

export function ApiSignUpCompleteOnboardingDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Complete onboarding",
      description:
        "Completes the onboarding process and creates the user's first workspace.",
    }),
    ApiBody({
      type: CompleteOnboardingDto,
    }),
    ApiOkResponse({
      description: "Onboarding completed successfully.",
      type: CompleteOnboardingResponseDto,
    }),
    ApiNotFoundResponse(
      ApiError(CompleteOnboardingService.errors.USER_NOT_FOUND),
    ),
    ApiBadRequestResponse(
      ApiError(CompleteOnboardingService.errors.USER_HAS_ONBOARDING_COMPLETED),
    ),
  );
}

export function ApiValidateVerificationCodeDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Validate email verification code",
      description:
        "Validates the verification code sent to the user's email address and marks the email as verified.",
    }),
    ApiBody({
      type: ValidateVerificationCodeDto,
    }),
    ApiOkResponse({
      description: "Email successfully verified.",
      type: ValidateVerificationCodeResponseDto,
    }),
    ApiBadRequestResponse({
      description: "The verification code is invalid.",
      content: {
        "application/json": {
          examples: {
            [ErrorCodes.VERIFICATION_CODE_EXPIRED]: {
              summary: "Verification code expired",
              value: ApiError(
                ValidateVerificationCodeService.errors
                  .VERIFICATION_CODE_EXPIRED,
              ),
            },
            [ErrorCodes.VERIFICATION_CODE_INCORRECT]: {
              summary: "Verification code incorrect",
              value: ApiError(
                ValidateVerificationCodeService.errors
                  .VERIFICATION_CODE_INCORRECT,
              ),
            },
          },
        },
      },
    }),
    ApiNotFoundResponse(
      ApiError(ValidateVerificationCodeService.errors.EMAIL_NOT_FOUND),
    ),
  );
}
