import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Request } from 'express';

type JwtAlgorithm = NonNullable<JwtSignOptions['algorithm']>;

@Injectable()
export class AuthGuard implements CanActivate {
  public JWT_ALGORITHM: JwtAlgorithm = 'HS256';

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Auth token is missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        algorithms: [this.JWT_ALGORITHM],
      });

      // 💡 Here the JWT secret key that's used for verifying the payload
      // is the key that was passed in the JwtModule
      console.log(payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.context = {
        session: {
          id: 'ascasc',
          refreshTokenHash: 'asc',
          createdAt: new Date(),
          userId: 'ascasc',
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
