import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { SessionEntityDto } from "src/domain/entities/session.entity";

export class CreateAccountWithGoogleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  googleIdToken!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fingerprintId!: string;
}

export class CreateAccountWithGoogleResponseDto extends SessionEntityDto {}
