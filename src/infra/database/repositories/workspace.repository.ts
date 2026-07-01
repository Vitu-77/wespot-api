import { Injectable } from '@nestjs/common';
import { WorkspaceRole } from 'prisma-types/enums';
import { WorkspaceCreateInput } from 'prisma-types/models';
import { WorkspaceMemberEntity } from 'src/domain/entities/workspace-member.entity';
import { WorkspaceEntity } from 'src/domain/entities/workspace.entity';
import { PrismaService } from 'src/infra/database/prisma.service';

type CreateMembershipmentInput = {
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
};

@Injectable()
export class WorkspaceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: WorkspaceCreateInput): Promise<WorkspaceEntity> {
    const workspace = await this.prismaService.workspace.create({
      data,
    });

    return workspace;
  }

  async createMembershipment(
    data: CreateMembershipmentInput,
  ): Promise<WorkspaceMemberEntity> {
    const membershipment = await this.prismaService.workspaceMember.create({
      data: {
        role: data.role,
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
