import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { WorkspacesController } from 'src/modules/workspaces/controllers/workspaces.controller';
import { AddUserToWorkspaceWithInviteService } from 'src/modules/workspaces/services/add-user-with-invite/add-user-with-invite.service';
import { CreateWorkspaceUserService } from 'src/modules/workspaces/services/create-user/create-user.service';
import { InviteUserToWorkspaceService } from 'src/modules/workspaces/services/invite-user/invite-user.service';
import { ListWorkspaceUsersService } from 'src/modules/workspaces/services/list-users/list-users.service';

@Module({
  imports: [AuthModule],
  controllers: [WorkspacesController],
  providers: [
    ListWorkspaceUsersService,
    CreateWorkspaceUserService,
    InviteUserToWorkspaceService,
    AddUserToWorkspaceWithInviteService,
  ],
})
export class WorkspacesModule {}
