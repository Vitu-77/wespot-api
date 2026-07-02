import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountWithGoogleDto {
  @IsString()
  @IsNotEmpty()
  googleIdToken!: string;

  @IsString()
  @IsNotEmpty()
  fingerprintId!: string;
}
