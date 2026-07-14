import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class DefaultSuccessResponseDto {
  @ApiProperty()
  @IsBoolean()
  success!: true;
}
