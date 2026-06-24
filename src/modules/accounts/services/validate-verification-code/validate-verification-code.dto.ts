import { IsEmail, IsString, Length } from 'class-validator';

export class ValidateVerificationCodeDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(4, 4)
  code!: string;
}
