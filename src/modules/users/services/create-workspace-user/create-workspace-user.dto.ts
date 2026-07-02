import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { WorkspaceRole } from 'prisma-types/enums';

export class CreateWorkspaceUserDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  email!: string;

  @IsString()
  @MinLength(5)
  password!: string;

  @IsString()
  @MinLength(5)
  passwordConfirmation!: string;

  @IsOptional()
  @IsEnum(WorkspaceRole)
  role!: WorkspaceRole;
}
