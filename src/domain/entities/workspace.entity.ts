import { ApiProperty } from "@nestjs/swagger";
import { WorkspaceType } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import { BrandEntity, BrandEntityDto } from "src/domain/entities/brand.entity";
import { SpotEntity, SpotEntityDto } from "src/domain/entities/spot.entity";
import {
  WorkspaceMemberEntity,
  WorkspaceMemberEntityDto,
} from "src/domain/entities/workspace-member.entity";

export type WorkspaceEntity = BaseEntity & {
  name: string | null;
  type: WorkspaceType;
  slug: string;

  brands?: BrandEntity[];
  spots?: SpotEntity[];
  members?: WorkspaceMemberEntity[];
};

export class WorkspaceEntityDto
  extends BaseEntityDto
  implements WorkspaceEntity
{
  @ApiProperty({ type: "string", nullable: true })
  name!: string | null;

  @ApiProperty()
  type!: WorkspaceType;

  @ApiProperty()
  slug!: string;

  @ApiProperty({ type: () => BrandEntityDto, isArray: true })
  brands?: BrandEntity[] | undefined;

  @ApiProperty({ type: () => SpotEntityDto, isArray: true })
  spots?: SpotEntity[] | undefined;

  @ApiProperty({ type: () => WorkspaceMemberEntityDto, isArray: true })
  members?: WorkspaceMemberEntity[] | undefined;
}
