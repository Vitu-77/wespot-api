import { Injectable } from '@nestjs/common';
import { WorkspaceMember } from 'prisma-types/client';
import {
  UserCreateWithoutWorkspacesInput,
  UserModel,
  UserUpdateWithoutWorkspacesInput,
  WorkspaceModel,
} from 'prisma-types/models';
import { UserEntity } from 'src/domain/entities/user.entity';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserRepositoryListParams } from 'src/infra/database/repositories/user-repository/user.repository.types';
import { contains, paginate } from 'src/shared/utils/query-helpers';

type DbUser = UserModel & {
  workspaces: (WorkspaceMember & { workspace: WorkspaceModel })[];
};

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private mapUserToEntity(raw: DbUser | null) {
    if (!raw) {
      return null;
    }

    const membershipments: UserEntity['workspaces'] = raw.workspaces.map(
      (m) => ({
        role: m.role,
        workspace: m.workspace,
      }),
    );

    return { ...raw, workspaces: membershipments } as unknown as UserEntity;
  }

  async list({
    pageNumber,
    pageSize,
    ...filters
  }: UserRepositoryListParams): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany({
      ...paginate({ pageNumber, pageSize }),

      where: {
        id: filters.id,
        email: contains(filters.email, 'default'),
        name: contains(filters.email, 'default'),

        workspaces: {
          some: {
            workspaceId: filters.workspaceId,
            role: filters.role,
          },
        },
      },

      include: {
        workspaces: {
          include: {
            workspace: true,
          },
        },
      },
    });

    return users.map((user) => this.mapUserToEntity(user)) as UserEntity[];
  }

  async listAndCount(params: UserRepositoryListParams) {
    console.log(params);

    const users = await this.list(params);
    const count = await this.prismaService.user.count({
      where: {
        email: contains(params.email, 'default'),
        name: contains(params.email, 'default'),
        workspaces: {
          some: {
            workspaceId: params.workspaceId,
            role: params.role,
          },
        },
      },
    });

    return {
      users,
      count,
    };
  }

  async getById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },

      include: {
        workspaces: {
          include: {
            workspace: true,
          },
        },
      },
    });

    return this.mapUserToEntity(user);
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },

      include: {
        workspaces: {
          include: {
            workspace: true,
          },
        },
      },
    });

    return this.mapUserToEntity(user);
  }

  async create(data: UserCreateWithoutWorkspacesInput): Promise<UserEntity> {
    const user = await this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        authProvider: data.authProvider,
        password: data.password ?? null,
        authProviderId: data.authProviderId ?? null,
        avatarUrl: data.avatarUrl,
        emailValidated: data.emailValidated,
        fingerprint: data.fingerprint,
      },
    });

    return user as unknown as UserEntity;
  }

  async updateById(
    id: string,
    data: UserUpdateWithoutWorkspacesInput,
  ): Promise<UserEntity> {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },

      data: {
        name: data.name,
        email: data.email,
        authProvider: data.authProvider,
        password: data.password ?? null,
        authProviderId: data.authProviderId ?? null,
        avatarUrl: data.avatarUrl,
        emailValidated: data.emailValidated,
      },
    });

    return user as unknown as UserEntity;
  }
}
