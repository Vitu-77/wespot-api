import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountWithGoogleDto {
  @IsString()
  @IsNotEmpty()
  fingerprintId!: string;

  @IsString()
  @IsNotEmpty()
  googleIdToken!: string;
}
