import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { type SessionEntity } from "src/domain/entities/session.entity";
import { SigninSessionResponseDto } from "src/shared/dto/signin-session.dto";

export class SigninWithEmailDto {
  @ApiProperty({ type: "string", format: "email" })
  @IsEmail()
  email!: string;

  @ApiProperty({ type: "string", format: "password", minLength: 1 })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class SigninWithEmailResponseDto {
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
