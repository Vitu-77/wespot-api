import _ from 'lodash';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, JwtSignOptions, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { WorkspaceRole } from 'prisma-types/enums';
import { WorkspaceUserEntity } from 'src/domain/entities/workspace-user.entity';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { env } from 'src/env';
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository';
import { AccessTokenPayload } from 'src/modules/auth/services/create-session/create-session.service';
import {
  AUTH_OPTIONS,
  AuthOptions,
} from 'src/shared/decorators/protected-route.decorator';

type JwtAlgorithm = NonNullable<JwtSignOptions['algorithm']>;

@Injectable()
export class AuthGuard implements CanActivate {
  public JWT_ALGORITHM: JwtAlgorithm = 'HS256';

  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const options = this.reflector.get<AuthOptions>(
      AUTH_OPTIONS,
      context.getHandler(),
    );

    const payload = await this.validateAccessToken(request);
    const { workspaceId, user } = await this.validateWorkspace(
      request,
      payload.sub,
    );

    request.ctx = {
      user,
      workspaceId,
    };

    if (options?.roles) {
      this.validateRoles(options.roles, user);
    }

    return true;
  }

  private async validateAccessToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    console.log({ type, token });

    if (!token || type !== 'Bearer') {
      throw new UnauthorizedException('Auth token is missing', {
        description: ErrorCodes.AUTH_TOKEN_IS_MISSING,
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(
        token,
        {
          secret: env.HASH_SECRET,
          algorithms: [this.JWT_ALGORITHM],
        },
      );

      return payload;
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Auth token expired', {
          description: ErrorCodes.AUTH_TOKEN_EXPIRED,
        });
      }

      throw new UnauthorizedException('Auth token is invalid', {
        description: ErrorCodes.AUTH_TOKEN_INVALID,
      });
    }
  }

  private async validateWorkspace(request: Request, userId: string) {
    const header = request.headers['x-workspace-id'];

    if (!header) {
      throw new ForbiddenException('Missing workspaceId', {
        description: ErrorCodes.MISSING_WORKSPACE_ID,
      });
    }

    const workspaceId = Array.isArray(header) ? header[0] : header;
    const [user] = await this.userRepository.list({
      pageNumber: 1,
      pageSize: 1,
      id: userId,
      workspaceId,
    });

    if (!user) {
      throw new ForbiddenException('User do not belongs to this workspace', {
        description: ErrorCodes.USER_DO_NOT_BELONGS_TO_WORKSPACE,
      });
    }

    const workspaceUser: WorkspaceUserEntity = {
      ..._.omit(user, ['workspaces']),
      role: user.workspaces[0].role,
    };

    return {
      workspaceId,
      user: workspaceUser,
    };
  }

  private validateRoles(roles: WorkspaceRole[], user: WorkspaceUserEntity) {
    if (!roles.includes(user.role)) {
      throw new ForbiddenException('Forbidden role', {
        description: ErrorCodes.FORBIDDEN_ROLE,
      });
    }

    return true;
  }
}
