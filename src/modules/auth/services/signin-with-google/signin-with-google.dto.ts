import { IsNotEmpty, IsString } from 'class-validator';

export class SigninWithGoogleDto {
  @IsString()
  @IsNotEmpty()
  googleIdToken!: string;
}
