import { WorkspaceRole } from "prisma-types/enums";
import { UserUpdateWithoutWorkspacesInput } from "prisma-types/models";

export type UserRepositoryListParams = {
  id?: string;
  workspaceId?: string;
  name?: string;
  email?: string;
  role?: WorkspaceRole;
  pageNumber: number;
  pageSize: number;
};

export type UpdateUserByIdParams = Omit<
  UserUpdateWithoutWorkspacesInput,
  "password" | "authProvider"
>;
