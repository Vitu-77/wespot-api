import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Auth token is missing');
    }

    try {
      // 💡 Here the JWT secret key that's used for verifying the payload
      // is the key that was passed in the JwtModule
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.context = {
        session: {
          id: 'ascasc',
          accessToken: 'abc',
          refreshToken: 'asc',
          user: {
            name: 'Victor',
            workspaceId: 'asc',
          } as any,
        },
      };

      // return true;
    } catch {
      throw new UnauthorizedException('Auth token is invalid');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
