import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { UserEntityDto } from "src/domain/entities/user.entity";

export class ValidateVerificationCodeDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @Length(4, 4)
  code!: string;
}

export class ValidateVerificationCodeResponseDto extends UserEntityDto {}
