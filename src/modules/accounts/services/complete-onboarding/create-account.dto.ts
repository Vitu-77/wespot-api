import { IsEnum, IsString, IsUUID, ValidateIf } from 'class-validator';
import { WorkspaceType } from 'prisma-types/enums';

export class CompleteOnboardingDto {
  @IsUUID()
  userId!: string;

  @IsEnum(WorkspaceType)
  workspaceType!: WorkspaceType;

  @ValidateIf((o: CompleteOnboardingDto) => o.workspaceType !== 'INDIVIDUAL')
  @IsString()
  workspaceName!: string;
}
