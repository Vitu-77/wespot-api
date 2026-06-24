import { Injectable } from '@nestjs/common';
import { WorkspaceRole } from 'prisma-types/enums';
import { WorkspaceMemberEntity } from 'src/domain/entities/workspace-member.entity';
import { PrismaService } from 'src/infra/prisma/prisma.service';

type Data = {
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
};

@Injectable()
export class CreateMembershipmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(data: Data): Promise<WorkspaceMemberEntity> {
    const membershipment = await this.prismaService.workspaceMember.create({
      data: {
        user: {
          connect: {
            id: data.userId,
          },
        },
        workspace: {
          connect: {
            id: data.workspaceId,
          },
        },
      },
    });

    return membershipment;
  }
}
