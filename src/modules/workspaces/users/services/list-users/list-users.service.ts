import { Injectable } from "@nestjs/common";
import { WorkspaceRole } from "prisma-types/enums";
import { UserRepository } from "src/infra/database/repositories/user-repository/user.repository";
import {
  ListWorkspaceUsersParamsDto,
  ListWorkspaceUsersResponseDto,
} from "src/modules/workspaces/users/services/list-users/list-users.dto";
import { PaginatedResponseDto } from "src/shared/dto/paginated-response.dto";

type Params = ListWorkspaceUsersParamsDto & {
  workspaceId: string;
};

@Injectable()
export class ListWorkspaceUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    pageNumber,
    pageSize,
    ...filters
  }: Params): Promise<ListWorkspaceUsersResponseDto> {
    const { count, users } = await this.userRepository.listAndCount({
      pageNumber,
      pageSize,
      ...filters,
    });

    return new PaginatedResponseDto({
      pageNumber,
      pageSize,
      totalItems: count,
      items: users.map(({ workspaces, ...user }) => ({
        ...user,
        role: workspaces.find((w) => w.workspace.id === filters.workspaceId)
          ?.role as WorkspaceRole,
      })),
    });
  }
}
