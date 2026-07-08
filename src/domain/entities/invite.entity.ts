import { ApiProperty } from "@nestjs/swagger";
import { WorkspaceRole } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";

export type InviteEntity = BaseEntity & {
  userEmail: string;
  workspaceId: string;
  userRole: WorkspaceRole;
};

export class InviteEntityDto extends BaseEntityDto implements InviteEntity {
  @ApiProperty()
  userEmail!: string;

  @ApiProperty()
  workspaceId!: string;

  @ApiProperty()
  userRole!: WorkspaceRole;
}
