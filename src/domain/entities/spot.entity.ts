import { ApiProperty } from "@nestjs/swagger";
import { SpotTone, SpotType } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import { BrandEntity, BrandEntityDto } from "src/domain/entities/brand.entity";
import { SpotCostEntityDto } from "src/domain/entities/spot-cost.entity";
import {
  SpotInputEntity,
  SpotInputEntityDto,
} from "src/domain/entities/spot-input.entity";
import {
  SpotVersionEntity,
  SpotVersionEntityDto,
} from "src/domain/entities/spot-version.entity";
import {
  WorkspaceEntity,
  WorkspaceEntityDto,
} from "src/domain/entities/workspace.entity";

export type SpotEntity = BaseEntity & {
  title: string;
  isDraft: boolean;
  starred: boolean;
  type: SpotType;
  voiceTone: SpotTone;

  workspaceId: string;
  workspace?: WorkspaceEntity;

  brandId: string | null;
  brand?: BrandEntity;

  inputId: string | null;
  input?: SpotInputEntity;

  versions: SpotVersionEntity[];

  // costs: SpotCostEN
};

export class SpotEntityDto extends BaseEntityDto implements SpotEntity {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  isDraft!: boolean;

  @ApiProperty()
  starred!: boolean;

  @ApiProperty()
  type!: SpotType;

  @ApiProperty({ enum: SpotTone })
  voiceTone!: SpotTone;

  @ApiProperty()
  workspaceId!: string;

  @ApiProperty({ type: () => WorkspaceEntityDto, required: false })
  workspace?: WorkspaceEntityDto;

  @ApiProperty()
  brandId!: string | null;

  @ApiProperty({ type: () => BrandEntityDto, required: false })
  brand?: BrandEntityDto;

  @ApiProperty()
  inputId!: string | null;

  @ApiProperty({ type: SpotInputEntityDto, required: false })
  input?: SpotInputEntityDto;

  @ApiProperty({ isArray: true, type: () => SpotVersionEntityDto })
  versions!: SpotVersionEntityDto[];

  @ApiProperty({ isArray: true, type: () => SpotCostEntityDto })
  costs!: SpotCostEntityDto;
}
