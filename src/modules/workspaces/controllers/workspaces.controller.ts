import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { type WorkspaceUserEntity } from 'src/domain/entities/workspace-user.entity';
import { AddUserToWorkspaceWithInviteService } from 'src/modules/workspaces/services/add-user-with-invite/add-user-with-invite.service';
import { CreateWorkspaceUserDto } from 'src/modules/workspaces/services/create-user/create-user.dto';
import { CreateWorkspaceUserService } from 'src/modules/workspaces/services/create-user/create-user.service';
import { InviteUserToWorkspaceDto } from 'src/modules/workspaces/services/invite-user/invite-user.dto';
import { InviteUserToWorkspaceService } from 'src/modules/workspaces/services/invite-user/invite-user.service';
import { ListWorkspaceUsersParamsDto } from 'src/modules/workspaces/services/list-users/list-users.dto';
import { ListWorkspaceUsersService } from 'src/modules/workspaces/services/list-users/list-users.service';
import { RemoveUserFromWorkspaceService } from 'src/modules/workspaces/services/remove-user/remove-user.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { CurrentWorkspaceId } from 'src/shared/decorators/current-workspace-id.decorator';
import { ProtectedRoute } from 'src/shared/decorators/protected-route.decorator';

@Controller('workspaces')
export class WorkspacesController {
  constructor(
    private readonly listWorkspaceUsersService: ListWorkspaceUsersService,
    private readonly createWorkspaceUserService: CreateWorkspaceUserService,
    private readonly inviteUserToWorkspaceService: InviteUserToWorkspaceService,
    private readonly addUserToWorkspaceWithInviteService: AddUserToWorkspaceWithInviteService,
    private readonly removeUserFromWorkspaceService: RemoveUserFromWorkspaceService,
  ) {}

  @ProtectedRoute({ roles: ['ADMIN', 'OWNER'] })
  @Get('/users')
  listUsers(
    @Query() queryParams: ListWorkspaceUsersParamsDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.listWorkspaceUsersService.execute({
      ...queryParams,
      workspaceId,
    });
  }

  @ProtectedRoute({ roles: ['ADMIN', 'OWNER'] })
  @Post('/users')
  createUser(
    @Body() body: CreateWorkspaceUserDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.createWorkspaceUserService.execute({
      ...body,
      workspaceId,
    });
  }

  @ProtectedRoute({ roles: ['ADMIN', 'OWNER'] })
  @Delete('/users/:userId')
  removeUser(
    @Param('userId') userId: string,
    @CurrentWorkspaceId() workspaceId: string,
    @CurrentUser() loggedUser: WorkspaceUserEntity,
  ) {
    return this.removeUserFromWorkspaceService.execute({
      loggedUser,
      userId,
      workspaceId,
    });
  }

  @ProtectedRoute({ roles: ['ADMIN', 'OWNER'] })
  @Post('/users/invite')
  inviteUser(
    @Body() body: InviteUserToWorkspaceDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.inviteUserToWorkspaceService.execute({
      ...body,
      workspaceId,
    });
  }

  @Post('/users/invite/:inviteId/join')
  addUserToWorkspaceWithInvite(@Param('inviteId') inviteId: string) {
    return this.addUserToWorkspaceWithInviteService.execute({
      inviteId,
    });
  }
}
