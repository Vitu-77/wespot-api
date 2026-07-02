import { WorkspaceType } from 'prisma-types/enums';
import { BaseEntity } from 'src/domain/entities/base.entity';
import { SpotEntity } from 'src/domain/entities/spot.entity';
import { WorkspaceMemberEntity } from 'src/domain/entities/workspace-member.entity';

export type WorkspaceEntity = BaseEntity & {
  id: string;
  name: string | null;
  type: WorkspaceType;

  // brands?  Brand[]
  spots?: SpotEntity[];
  members?: WorkspaceMemberEntity[];
};
