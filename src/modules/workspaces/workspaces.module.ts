import { Module } from '@nestjs/common';
import { WorkspacesController } from 'src/modules/workspaces/controllers/workspaces.controller';
import { CreateWorkspaceService } from 'src/modules/workspaces/services/create-workspace/create-workspace.service';

@Module({
  imports: [],
  controllers: [WorkspacesController],
  providers: [CreateWorkspaceService],
  exports: [CreateWorkspaceService],
})
export class WorkspacesModule {}
