import { ApiProperty } from "@nestjs/swagger";
import { CostService, TTSProvider } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "./base.entity";
import { SpotEntity, SpotEntityDto } from "./spot.entity";

export type SpotCostEntity = BaseEntity & {
  provider: TTSProvider;
  service: CostService;
  costCents: number;
  metadata: JSON | null;

  spotId: string;
  spot?: SpotEntity;
};

export class SpotCostEntityDto extends BaseEntityDto implements SpotCostEntity {
  @ApiProperty({
    enum: TTSProvider,
  })
  provider!: TTSProvider;

  @ApiProperty({
    enum: CostService,
  })
  service!: CostService;

  @ApiProperty()
  costCents!: number;

  @ApiProperty({
    nullable: true,
    type: Object,
  })
  metadata!: JSON | null;

  @ApiProperty()
  spotId!: string;

  @ApiProperty({
    type: () => SpotEntityDto,
    required: false,
  })
  spot?: SpotEntityDto;
}
