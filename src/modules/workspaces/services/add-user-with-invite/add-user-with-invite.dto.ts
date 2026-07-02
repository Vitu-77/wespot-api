import { IsUUID } from 'class-validator';

export class AddUserToWorkspaceWithInviteDto {
  @IsUUID()
  inviteId!: string;
}
