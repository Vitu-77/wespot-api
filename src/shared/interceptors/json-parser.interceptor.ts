import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from "@nestjs/common";
import { Observable } from "rxjs";

export function JsonParserInterceptor(
  field = "payload",
): Type<NestInterceptor> {
  @Injectable()
  class JsonParserInterceptorMixin implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<unknown> {
      const request = context.switchToHttp().getRequest();

      const value = request.body?.[field];

      if (value == null) {
        return next.handle();
      }

      if (typeof value === "object") {
        request.body = value;

        return next.handle();
      }

      if (typeof value !== "string") {
        throw new BadRequestException(
          `Multipart field "${field}" must be a JSON string.`,
        );
      }

      try {
        request.body = JSON.parse(value);
      } catch {
        throw new BadRequestException(
          `Multipart field "${field}" contains invalid JSON.`,
        );
      }

      return next.handle();
    }
  }

  return mixin(JsonParserInterceptorMixin);
}
