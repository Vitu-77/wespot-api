import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateAccountWithEmailDto {
  @IsString()
  @IsNotEmpty()
  fingerprintId!: string

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsEmail()
  email!: string

  @IsString()
  @MinLength(5)
  password!: string

  @IsString()
  @MinLength(5)
  passwordConfirmation!: string
}
