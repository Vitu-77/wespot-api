import { SpotStatus } from 'prisma-types/enums';
import { BaseEntity } from 'src/domain/entities/base.entity';

export type SpotEntity = BaseEntity & {
  title: string;
  status: SpotStatus;
  script: string;
  audioUrl: string | null;
  starred: boolean;
  expectedDuration: number;
  audioDuration: number | null;

  workspaceId: string;
  // workspace:

  brandId: string | null;
  // brand

  inputId: string | null;
  // input

  costs: [];

  voiceId: string | null;
};
