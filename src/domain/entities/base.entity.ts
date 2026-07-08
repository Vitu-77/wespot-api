import { ApiProperty } from "@nestjs/swagger";

export type BaseEntity = {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
};

export class BaseEntityDto implements BaseEntity {
  @ApiProperty({ format: "uuid" })
  id!: string;

  @ApiProperty({ type: "string", format: "date-time" })
  createdAt!: string;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  updatedAt!: string | null;
}
