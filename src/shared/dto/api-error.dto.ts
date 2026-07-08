import { ErrorDiscrimination } from "src/domain/exceptions/errors.map";

export function ApiError({ error, message, statusCode }: ErrorDiscrimination) {
  return {
    description: message,
    example: {
      message,
      error,
      statusCode,
    },
  };
}
