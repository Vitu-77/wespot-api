import { ApiProperty } from "@nestjs/swagger";

export type SessionEntity = {
  userId: string;
  refreshTokenHash: string;
  createdAt: Date;
};

export class SessionEntityDto implements SessionEntity {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  refreshTokenHash!: string;

  @ApiProperty()
  createdAt!: Date;
}
