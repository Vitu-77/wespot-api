import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type WorkspaceUserEntity } from "src/domain/entities/workspace-user.entity";
import { AddUserToWorkspaceWithInviteService } from "src/modules/workspaces/users/services/add-user-with-invite/add-user-with-invite.service";
import { CreateWorkspaceUserDto } from "src/modules/workspaces/users/services/create-user/create-user.dto";
import { CreateWorkspaceUserService } from "src/modules/workspaces/users/services/create-user/create-user.service";
import { InviteUserToWorkspaceDto } from "src/modules/workspaces/users/services/invite-user/invite-user.dto";
import { InviteUserToWorkspaceService } from "src/modules/workspaces/users/services/invite-user/invite-user.service";
import { ListWorkspaceUsersParamsDto } from "src/modules/workspaces/users/services/list-users/list-users.dto";
import { ListWorkspaceUsersService } from "src/modules/workspaces/users/services/list-users/list-users.service";
import { RemoveUserFromWorkspaceService } from "src/modules/workspaces/users/services/remove-user/remove-user.service";
import { ApiWorkspaceHeader } from "src/shared/decorators/api-workspace-header.decorator";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { CurrentWorkspaceId } from "src/shared/decorators/current-workspace-id.decorator";
import { ProtectedRoute } from "src/shared/decorators/protected-route.decorator";

@ApiTags("Workspace ⌁ Users")
@ApiWorkspaceHeader()
@Controller("workspace/users")
export class WorkspaceUsersController {
  constructor(
    private readonly listWorkspaceUsersService: ListWorkspaceUsersService,
    private readonly createWorkspaceUserService: CreateWorkspaceUserService,
    private readonly inviteUserToWorkspaceService: InviteUserToWorkspaceService,
    private readonly addUserToWorkspaceWithInviteService: AddUserToWorkspaceWithInviteService,
    private readonly removeUserFromWorkspaceService: RemoveUserFromWorkspaceService,
  ) {}

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Get("/")
  listWorkspaceUsers(
    @Query() queryParams: ListWorkspaceUsersParamsDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.listWorkspaceUsersService.execute({
      ...queryParams,
      workspaceId,
    });
  }

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Post("/")
  createWorkspaceUser(
    @Body() body: CreateWorkspaceUserDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.createWorkspaceUserService.execute({
      ...body,
      workspaceId,
    });
  }

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Delete("/:userId")
  removeUserFromWorkspace(
    @Param("userId") userId: string,
    @CurrentWorkspaceId() workspaceId: string,
    @CurrentUser() loggedUser: WorkspaceUserEntity,
  ) {
    return this.removeUserFromWorkspaceService.execute({
      loggedUser,
      userId,
      workspaceId,
    });
  }

  @ProtectedRoute({ roles: ["ADMIN", "OWNER"] })
  @Post("/invite")
  inviteUserToWorkspace(
    @Body() body: InviteUserToWorkspaceDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.inviteUserToWorkspaceService.execute({
      ...body,
      workspaceId,
    });
  }

  // TODO: Mover esse método para um módulo de usuário
  @Post("/invite/:inviteId/join")
  addUserToWorkspaceWithInvite(@Param("inviteId") inviteId: string) {
    return this.addUserToWorkspaceWithInviteService.execute({
      inviteId,
    });
  }
}
