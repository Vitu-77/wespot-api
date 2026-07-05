import { Injectable } from '@nestjs/common';
import { WorkspaceCreateInput } from 'prisma-types/models';
import { WorkspaceMemberEntity } from 'src/domain/entities/workspace-member.entity';
import { WorkspaceEntity } from 'src/domain/entities/workspace.entity';
import { PrismaService } from 'src/infra/database/prisma.service';
import {
  WorkspaceRepositoryCreateMemberParams,
  WorkspaceRepositoryDeleteMemberParams,
} from 'src/infra/database/repositories/workspace-repository/workspace.repository.types';

@Injectable()
export class WorkspaceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string): Promise<WorkspaceEntity | null> {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        id,
      },
    });

    return workspace;
  }

  async create(data: WorkspaceCreateInput): Promise<WorkspaceEntity> {
    const workspace = await this.prismaService.workspace.create({
      data,
    });

    return workspace;
  }

  async createMember(
    data: WorkspaceRepositoryCreateMemberParams,
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

      include: {
        workspace: true,
      },
    });

    return membershipment;
  }

  async deleteMember({
    userId,
    workspaceId,
  }: WorkspaceRepositoryDeleteMemberParams) {
    await this.prismaService.workspaceMember.delete({
      where: {
        workspaceId_userId: {
          userId,
          workspaceId,
        },
      },
    });
  }
}
