import { Injectable } from '@nestjs/common';
import { UserUpdateWithoutWorkspacesInput } from 'prisma-types/models';
import { UserEntity } from 'src/domain/entities/user.entity';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class UpdateUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
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
