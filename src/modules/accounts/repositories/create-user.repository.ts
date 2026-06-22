import { Injectable } from '@nestjs/common';
import { UserCreateWithoutWorkspacesInput } from 'prisma-types/models';
import { UserEntity } from 'src/domain/entities/user.entity';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CreateUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(data: UserCreateWithoutWorkspacesInput): Promise<UserEntity> {
    const user = await this.prismaService.user.create({
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
