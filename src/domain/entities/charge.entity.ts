import { ApiProperty } from "@nestjs/swagger";
import { ChargeStatus } from "prisma-types/enums";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";

export type ChargeEntity = BaseEntity & {
  status: ChargeStatus;
  value: bigint;
  description: string;
  invoiceSummaryId: string;
};

export class ChargeEntityDto extends BaseEntityDto implements ChargeEntity {
  @ApiProperty({
    enum: ChargeStatus,
    enumName: "ChargeStatus",
  })
  status!: ChargeStatus;

  @ApiProperty()
  value!: bigint;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  invoiceSummaryId!: string;
}
