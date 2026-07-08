import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { type SessionEntity } from "src/domain/entities/session.entity";
import { SigninSessionResponseDto } from "src/shared/dto/signin-session.dto";

export class SigninWithGoogleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  googleIdToken!: string;
}

export class SigninWithGoogleResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty({ type: () => SigninSessionResponseDto })
  session!: SessionEntity;
}
