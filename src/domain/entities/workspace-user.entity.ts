import { ApiProperty } from "@nestjs/swagger";
import { AuthProvider, WorkspaceRole } from "prisma-types/enums";
import { BaseEntityDto } from "src/domain/entities/base.entity";
import { UserEntity } from "src/domain/entities/user.entity";

export type WorkspaceUserEntity = Omit<UserEntity, "workspaces"> & {
  role: WorkspaceRole;
};

export class WorkspaceUserEntityDto
  extends BaseEntityDto
  implements WorkspaceUserEntity
{
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  avatarUrl!: string | null;

  @ApiProperty()
  authProvider!: AuthProvider;

  @ApiProperty()
  fingerprint!: string;

  @ApiProperty()
  role!: WorkspaceRole;
}
