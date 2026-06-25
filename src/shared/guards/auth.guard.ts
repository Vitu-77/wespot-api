import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Request } from 'express';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { AccessTokenPayload } from 'src/modules/auth/services/create-session/create-session.service';

type JwtAlgorithm = NonNullable<JwtSignOptions['algorithm']>;

@Injectable()
export class AuthGuard implements CanActivate {
  public JWT_ALGORITHM: JwtAlgorithm = 'HS256';

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.getAccessToken(request);

    if (!token) {
      throw new UnauthorizedException('Auth token is missing', {
        description: ErrorCodes.AUTH_TOKEN_IS_MISSING,
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(
        token,
        {
          algorithms: [this.JWT_ALGORITHM],
        },
      );

      request.ctx = {
        userId: payload.sub,
        workspaceId: this.getWorkspaceId(request),
      };
    } catch {
      throw new UnauthorizedException('Auth token is invalid', {
        description: ErrorCodes.INVALID_AUTH_TOKEN,
      });
    }

    return true;
  }

  private getAccessToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getWorkspaceId(request: Request): string | undefined {
    const workspaceId = request.headers['x-workspace-id'];
    return workspaceId
      ? Array.isArray(workspaceId)
        ? workspaceId[0]
        : workspaceId
      : undefined;
  }
}
