import { IsNotEmpty, IsString } from 'class-validator';

export class SignoutDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;
}
