import { ApiProperty } from "@nestjs/swagger";
import { SpotEntity, SpotEntityDto } from "src/domain/entities/spot.entity";

export type SpotInputEntity = {
  data: JSON | string;

  spotId: string;
  spot?: SpotEntity;
};

export class SpotInputEntityDto {
  @ApiProperty({
    oneOf: [{ type: "object" }, { type: "string" }],
  })
  data!: JSON | string;

  @ApiProperty()
  spotId!: string;

  @ApiProperty({
    type: () => SpotEntityDto,
    required: false,
  })
  spot?: SpotEntityDto;

  @ApiProperty({ type: "string", format: "date-time" })
  createdAt!: string | Date;
}
