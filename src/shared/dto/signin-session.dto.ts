import { ApiProperty } from "@nestjs/swagger";
import { SessionEntity } from "src/domain/entities/session.entity";

export class SigninSessionResponseDto implements SessionEntity {
  @ApiProperty({ type: "string" })
  userId!: string;

  @ApiProperty({ type: "string" })
  refreshTokenHash!: string;

  @ApiProperty({ type: "string", format: "date" })
  createdAt!: Date;
}
