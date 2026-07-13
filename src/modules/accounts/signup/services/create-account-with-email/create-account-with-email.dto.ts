import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { SessionEntityDto } from "src/domain/entities/session.entity";

export class CreateAccountWithEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fingerprintId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  password!: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  passwordConfirmation!: string;
}

export class CreateAccountWithEmailResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty({ type: () => SessionEntityDto })
  session!: SessionEntityDto;
}
