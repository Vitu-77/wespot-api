import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "src/modules/accounts/signin/guards/auth.guard";
import { CreateNotificationService } from "src/modules/notifications/services/create-notification/create-notification.service";
import { AddUserToWorkspaceWithInviteService } from "src/modules/workspaces/users/services/add-user-with-invite/add-user-with-invite.service";
import { CreateWorkspaceUserService } from "src/modules/workspaces/users/services/create-user/create-user.service";
import { InviteUserToWorkspaceService } from "src/modules/workspaces/users/services/invite-user/invite-user.service";
import { ListWorkspaceUsersService } from "src/modules/workspaces/users/services/list-users/list-users.service";
import { RemoveUserFromWorkspaceService } from "src/modules/workspaces/users/services/remove-user/remove-user.service";
import { WorkspaceUsersController } from "src/modules/workspaces/users/users.controller";

@Module({
  imports: [JwtModule],
  controllers: [WorkspaceUsersController],
  providers: [
    AuthGuard,

    ListWorkspaceUsersService,
    CreateWorkspaceUserService,
    InviteUserToWorkspaceService,
    AddUserToWorkspaceWithInviteService,
    RemoveUserFromWorkspaceService,
    CreateNotificationService,
  ],
})
export class WorkspaceUsersModule {}
