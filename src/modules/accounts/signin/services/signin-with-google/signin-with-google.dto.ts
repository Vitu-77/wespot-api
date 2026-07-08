import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { type SessionEntity } from "src/domain/entities/session.entity";
import { SigninSessionResponseDto } from "src/shared/dto/signin-session.dto";

export class SigninWithGoogleDto {
  @ApiProperty({ description: "Token OAuth do Google." })
  @IsString()
  @IsNotEmpty()
  googleIdToken!: string;
}

export class SigninWithGoogleResponseDto {
  @ApiProperty({ description: "JWT utilizado para autenticação." })
  accessToken!: string;

  @ApiProperty({ description: "Token utilizado para renovar a sessão." })
  refreshToken!: string;

  @ApiProperty({
    type: () => SigninSessionResponseDto,
    description: "Sessão autenticada do usuário.",
  })
  session!: SessionEntity;
}
