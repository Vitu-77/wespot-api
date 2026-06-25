import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninWithEmailDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
