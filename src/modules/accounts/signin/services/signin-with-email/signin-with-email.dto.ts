import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { type SessionEntity } from "src/domain/entities/session.entity";
import { SigninSessionResponseDto } from "src/shared/dto/signin-session.dto";

export class SigninWithEmailDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class SigninWithEmailResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty({ type: () => SigninSessionResponseDto })
  session!: SessionEntity;
}
