import { ApiProperty } from "@nestjs/swagger";
import { AuthProvider, WorkspaceRole } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import {
  WorkspaceEntity,
  WorkspaceEntityDto,
} from "src/domain/entities/workspace.entity";

export type MembershipmentEntity = {
  role: WorkspaceRole;
  workspace: WorkspaceEntity;
};

export class MembershipmentDto implements MembershipmentEntity {
  @ApiProperty()
  role!: WorkspaceRole;

  @ApiProperty()
  workspace!: WorkspaceEntityDto;
}

export type UserEntity = BaseEntity & {
  name: string;
  email: string;
  password?: string | null;
  avatarUrl: string | null;
  authProvider: AuthProvider;
  fingerprint: string;

  workspaces: MembershipmentEntity[];
};

export class UserEntityDto extends BaseEntityDto implements UserEntity {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ nullable: true, type: "string" })
  avatarUrl!: string | null;

  @ApiProperty({ enum: AuthProvider })
  authProvider!: AuthProvider;

  @ApiProperty()
  fingerprint!: string;

  @ApiProperty({ type: () => MembershipmentDto })
  workspaces!: MembershipmentEntity[];
}
