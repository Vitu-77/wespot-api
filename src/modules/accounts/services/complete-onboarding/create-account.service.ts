import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { AuthProvider } from 'prisma-types/enums';

export class CreateAccountDto {
  @IsEnum(AuthProvider)
  provider!: AuthProvider;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @ValidateIf((o) => o.provider === AuthProvider.EMAIL)
  @MinLength(8)
  password?: string;
}
