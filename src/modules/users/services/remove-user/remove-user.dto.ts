import { IsString } from 'class-validator';

export class RemoveUserFromWorkspaceDto {
  @IsString()
  userId!: string;

  @IsString()
  workspaceId!: string;
}
