import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAccountWithEmailDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(5)
  password!: string;

  @IsString()
  @MinLength(5)
  passwordConfirmation!: string;
}
