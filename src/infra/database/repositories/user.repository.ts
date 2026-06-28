import { Injectable } from '@nestjs/common';
import {
  UserCreateWithoutWorkspacesInput,
  UserUpdateWithoutWorkspacesInput,
} from 'prisma-types/models';
import { UserEntity } from 'src/domain/entities/user.entity';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

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

    if (!user) {
      return null;
    }

    const membershipments: UserEntity['workspaces'] = user.workspaces.map(
      (m) => ({
        role: m.role,
        workspace: m.workspace,
      }),
    );

    return { ...user, workspaces: membershipments } as unknown as UserEntity;
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user as unknown as UserEntity;
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
