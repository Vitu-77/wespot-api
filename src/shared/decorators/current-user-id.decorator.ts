import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUserId = createParamDecorator(
  (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.ctx['userId'] ?? null;
  },
);
