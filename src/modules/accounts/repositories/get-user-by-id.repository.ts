import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class GetUserByIdRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string) {
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
}
