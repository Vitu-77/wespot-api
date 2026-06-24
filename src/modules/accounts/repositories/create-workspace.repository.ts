import { Injectable } from '@nestjs/common';
import { WorkspaceCreateInput } from 'prisma-types/models';
import { WorkspaceEntity } from 'src/domain/entities/workspace.entity';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CreateWorkspaceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(data: WorkspaceCreateInput): Promise<WorkspaceEntity> {
    const workspace = await this.prismaService.workspace.create({
      data,
    });

    return workspace;
  }
}
