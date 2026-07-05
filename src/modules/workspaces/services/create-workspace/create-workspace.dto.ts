import { IsEnum, IsString, ValidateIf } from 'class-validator';
import { WorkspaceType } from 'prisma-types/enums';

export class CreateWorkspaceDto {
  @IsEnum(WorkspaceType)
  type!: WorkspaceType;

  @ValidateIf((o: CreateWorkspaceDto) => o.type !== 'INDIVIDUAL')
  @IsString()
  name!: string;
}
