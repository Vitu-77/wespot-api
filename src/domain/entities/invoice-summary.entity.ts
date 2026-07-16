import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, BaseEntityDto } from "src/domain/entities/base.entity";

export type InvoiceSummaryEntity = BaseEntity & {
  fromAt: Date;
  toAt: Date;
  availableSpots: number;
  generatedSpots: number;
  subscriptionId: string;
};

export class InvoiceSummaryEntityDto
  extends BaseEntityDto
  implements InvoiceSummaryEntity
{
  @ApiProperty({ type: Date })
  fromAt!: Date;

  @ApiProperty({ type: Date })
  toAt!: Date;

  @ApiProperty()
  availableSpots!: number;

  @ApiProperty()
  generatedSpots!: number;

  @ApiProperty()
  subscriptionId!: string;
}
