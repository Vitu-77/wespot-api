import { ApiProperty } from "@nestjs/swagger";
import { WorkspaceRole } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { WorkspaceEntity } from "src/domain/entities/workspace.entity";

export type WorkspaceMemberEntity = Omit<BaseEntity, "id"> & {
  role: WorkspaceRole;

  userId: string;
  user?: UserEntity;

  workspaceId: string;
  workspace?: WorkspaceEntity;
};

export class WorkspaceMemberEntityDto
  extends BaseEntityDto
  implements WorkspaceMemberEntity
{
  @ApiProperty()
  role!: WorkspaceRole;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  user?: UserEntity | undefined;

  @ApiProperty()
  workspaceId!: string;

  @ApiProperty()
  workspace?: WorkspaceEntity | undefined;
}
