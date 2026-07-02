import { IsIn, IsString, MinLength } from 'class-validator';
import { WorkspaceRole } from 'prisma-types/enums';

export class CreateWorkspaceUserDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  @MinLength(5)
  password!: string;

  @IsString()
  @MinLength(5)
  passwordConfirmation!: string;

  @IsIn([WorkspaceRole.MEMBER, WorkspaceRole.ADMIN])
  role!: 'MEMBER' | 'ADMIN';
}
