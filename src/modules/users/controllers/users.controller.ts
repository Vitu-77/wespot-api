import { Controller, Get, Query } from '@nestjs/common';
import { ListWorkspaceUsersParamsDto } from 'src/modules/users/services/list-workspace-users/list-workspace-users.dto';
import { ListWorkspaceUsersService } from 'src/modules/users/services/list-workspace-users/list-workspace-users.service';
import { CurrentWorkspaceId } from 'src/shared/decorators/current-workspace-id.decorator';
import { ProtectedRoute } from 'src/shared/decorators/protected-route.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly listWorkspaceUsersService: ListWorkspaceUsersService,
  ) {}

  @ProtectedRoute({ roles: ['ADMIN', 'OWNER'] })
  @Get('/')
  listWorkspaceUsers(
    @Query() queryParams: ListWorkspaceUsersParamsDto,
    @CurrentWorkspaceId() workspaceId: string,
  ) {
    return this.listWorkspaceUsersService.execute({
      ...queryParams,
      workspaceId,
    });
  }
}
