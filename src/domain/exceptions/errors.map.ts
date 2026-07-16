import { ErrorCodes } from "src/domain/exceptions/error-codes.enum";

export type ErrorDiscrimination = {
  message: string;
  error: ErrorCodes;
  statusCode: 400 | 401 | 403 | 404 | 409;
};

export const ErrorsMap: Record<ErrorCodes, ErrorDiscrimination> = {
  // Auth Errors
  AUTH_TOKEN_INVALID: {
    message: "Authentication token is invalid.",
    error: ErrorCodes.AUTH_TOKEN_INVALID,
    statusCode: 401,
  },
  AUTH_TOKEN_EXPIRED: {
    message: "Authentication token has expired.",
    error: ErrorCodes.AUTH_TOKEN_EXPIRED,
    statusCode: 401,
  },
  AUTH_TOKEN_IS_MISSING: {
    message: "Authentication token is missing.",
    error: ErrorCodes.AUTH_TOKEN_IS_MISSING,
    statusCode: 401,
  },
  EMAIL_NOT_FOUND: {
    message: "User not found with this email.",
    error: ErrorCodes.EMAIL_NOT_FOUND,
    statusCode: 404,
  },
  PASSWORDS_DO_NOT_MATCH: {
    message: "Password does not match.",
    error: ErrorCodes.PASSWORDS_DO_NOT_MATCH,
    statusCode: 401,
  },
  DISPOSABLE_EMAIL_NOT_ALLOWED: {
    message: "Disposable email addresses are not allowed.",
    error: ErrorCodes.DISPOSABLE_EMAIL_NOT_ALLOWED,
    statusCode: 400,
  },
  EMAIL_ALREADY_IN_USE: {
    message: "Email is already in use.",
    error: ErrorCodes.EMAIL_ALREADY_IN_USE,
    statusCode: 409,
  },
  INVALID_GOOGLE_TOKEN: {
    message: "Google token is invalid.",
    error: ErrorCodes.INVALID_GOOGLE_TOKEN,
    statusCode: 400,
  },
  GOOGLE_ACCOUNT_NOT_FOUND: {
    message: "Google account was not found.",
    error: ErrorCodes.GOOGLE_ACCOUNT_NOT_FOUND,
    statusCode: 404,
  },
  GOOGLE_ACCOUNT_INCOMPLETE: {
    message: "Google account is incomplete.",
    error: ErrorCodes.GOOGLE_ACCOUNT_INCOMPLETE,
    statusCode: 401,
  },
  EMAIL_ALREADY_REGISTERED_WITH_GOOGLE: {
    message: "This email is already registered with Google authentication.",
    error: ErrorCodes.EMAIL_ALREADY_REGISTERED_WITH_GOOGLE,
    statusCode: 409,
  },
  EMAIL_ALREADY_REGISTERED_WITH_PASSWORD: {
    message: "This email is already registered with password authentication.",
    error: ErrorCodes.EMAIL_ALREADY_REGISTERED_WITH_PASSWORD,
    statusCode: 409,
  },
  ACCOUNT_CREATION_FAILED: {
    message: "Failed to create account.",
    error: ErrorCodes.ACCOUNT_CREATION_FAILED,
    statusCode: 400,
  },
  VERIFICATION_CODE_EXPIRED: {
    message: "Verification code has expired.",
    error: ErrorCodes.VERIFICATION_CODE_EXPIRED,
    statusCode: 400,
  },
  VERIFICATION_CODE_INCORRECT: {
    message: "Verification code is incorrect.",
    error: ErrorCodes.VERIFICATION_CODE_INCORRECT,
    statusCode: 400,
  },
  FINGERPRINT_LOCKED: {
    message: "Too many accounts have been created from this device.",
    error: ErrorCodes.FINGERPRINT_LOCKED,
    statusCode: 409,
  },
  USER_HAS_LOGIN_WITH_GOOGLE: {
    message: "This account uses Google authentication.",
    error: ErrorCodes.USER_HAS_LOGIN_WITH_GOOGLE,
    statusCode: 400,
  },
  USER_HAS_LOGIN_WITH_EMAIL: {
    message: "This account uses email and password authentication.",
    error: ErrorCodes.USER_HAS_LOGIN_WITH_EMAIL,
    statusCode: 404,
  },
  USER_HAS_ONBOARDING_COMPLETED: {
    message: "User has already completed onboarding.",
    error: ErrorCodes.USER_HAS_ONBOARDING_COMPLETED,
    statusCode: 400,
  },
  FORBIDDEN_ROLE: {
    message: "You do not have permission to perform this action.",
    error: ErrorCodes.FORBIDDEN_ROLE,
    statusCode: 403,
  },
  MISSING_WORKSPACE_ID: {
    message: "Workspace ID is required.",
    error: ErrorCodes.MISSING_WORKSPACE_ID,
    statusCode: 400,
  },

  // Mail Errors
  FAILED_TO_SEND_EMAIL: {
    message: "Failed to send email.",
    error: ErrorCodes.FAILED_TO_SEND_EMAIL,
    statusCode: 400,
  },

  // User Errors
  USER_NOT_FOUND: {
    message: "User not found.",
    error: ErrorCodes.USER_NOT_FOUND,
    statusCode: 404,
  },
  USER_ALREADY_IN_WORKSPACE: {
    message: "User is already a member of this workspace.",
    error: ErrorCodes.USER_ALREADY_IN_WORKSPACE,
    statusCode: 400,
  },
  USER_IN_OTHER_WORKSPACES: {
    message: "User already belongs to another workspace.",
    error: ErrorCodes.USER_IN_OTHER_WORKSPACES,
    statusCode: 403,
  },
  INVITE_EXPIRED: {
    message: "Invitation has expired.",
    error: ErrorCodes.INVITE_EXPIRED,
    statusCode: 400,
  },
  INVITE_BELONGS_TO_ANOTHER_USER: {
    message: "This invitation belongs to another user.",
    error: ErrorCodes.INVITE_BELONGS_TO_ANOTHER_USER,
    statusCode: 403,
  },
  USER_DO_NOT_BELONGS_TO_WORKSPACE: {
    message: "User does not belong to this workspace.",
    error: ErrorCodes.USER_DO_NOT_BELONGS_TO_WORKSPACE,
    statusCode: 403,
  },
  OWNERS_USERS_CANNOT_BE_REMOVED: {
    message: "Workspace owners cannot be removed.",
    error: ErrorCodes.OWNERS_USERS_CANNOT_BE_REMOVED,
    statusCode: 403,
  },

  // Workspace Errors
  WORKSPACE_NOT_FOUND: {
    message: "Workspace not found.",
    error: ErrorCodes.WORKSPACE_NOT_FOUND,
    statusCode: 404,
  },
  WORKSPACE_NAME_NOT_PROVIDED: {
    message: "Workspace name was not provided.",
    error: ErrorCodes.WORKSPACE_NAME_NOT_PROVIDED,
    statusCode: 400,
  },

  // Brands
  BRAND_NOT_FOUND: {
    message: "Brand not found.",
    error: ErrorCodes.BRAND_NOT_FOUND,
    statusCode: 404,
  },
  BRAND_ADDRESS_NOT_FOUND: {
    message: "Brand address not found.",
    error: ErrorCodes.BRAND_ADDRESS_NOT_FOUND,
    statusCode: 404,
  },
  BRAND_NAME_IS_TAKEN: {
    message: "Brand name is taken.",
    error: ErrorCodes.BRAND_NAME_IS_TAKEN,
    statusCode: 400,
  },
  BRAND_RESPONSIBLE_NAME_IS_TAKEN: {
    message: "Brand responsible name is taken.",
    error: ErrorCodes.BRAND_RESPONSIBLE_NAME_IS_TAKEN,
    statusCode: 400,
  },
};
