import { Module } from '@nestjs/common'
import { AuthModule } from 'src/modules/auth/auth.module'
import { CreateNotificationService } from 'src/modules/notifications/services/create-notification/create-notification.service'
import { UsersController } from 'src/modules/users/controllers/users.controller'
import { AddUserToWorkspaceWithInviteService } from 'src/modules/users/services/add-user-with-invite/add-user-with-invite.service'
import { CreateWorkspaceUserService } from 'src/modules/users/services/create-user/create-user.service'
import { InviteUserToWorkspaceService } from 'src/modules/users/services/invite-user/invite-user.service'
import { ListWorkspaceUsersService } from 'src/modules/users/services/list-users/list-users.service'
import { RemoveUserFromWorkspaceService } from 'src/modules/users/services/remove-user/remove-user.service'

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    ListWorkspaceUsersService,
    CreateWorkspaceUserService,
    InviteUserToWorkspaceService,
    AddUserToWorkspaceWithInviteService,
    RemoveUserFromWorkspaceService,
    CreateNotificationService,
  ],
})
export class UsersModule {}
