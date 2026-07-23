import { ApiProperty } from "@nestjs/swagger";
import { SpotStatus } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";
import { BrandEntity } from "src/domain/entities/brand.entity";
import { WorkspaceEntity } from "src/domain/entities/workspace.entity";

export type SpotEntity = BaseEntity & {
  title: string;
  status: SpotStatus;
  script: string;
  audioUrl: string | null;
  starred: boolean;
  expectedDuration: number;
  audioDuration: number | null;

  workspaceId: string;
  workspace?: WorkspaceEntity;

  brandId: string | null;
  brand?: BrandEntity;

  inputId: string | null;
  // input

  costs: [];
  // TODO: incluir costs

  voiceId: string | null;
  // TODO: incluir voices
};

export class SpotEntityDto extends BaseEntityDto implements SpotEntity {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  status!: SpotStatus;

  @ApiProperty()
  script!: string;

  @ApiProperty()
  audioUrl!: string | null;

  @ApiProperty()
  starred!: boolean;

  @ApiProperty()
  expectedDuration!: number;

  @ApiProperty()
  audioDuration!: number | null;

  @ApiProperty()
  workspaceId!: string;

  @ApiProperty()
  workspace?: WorkspaceEntity | undefined;

  @ApiProperty()
  brandId!: string | null;

  @ApiProperty()
  brand?: BrandEntity | undefined;

  @ApiProperty()
  inputId!: string | null;

  @ApiProperty()
  voiceId!: string | null;

  costs!: [];
  // TODO: Incluir costs
}
