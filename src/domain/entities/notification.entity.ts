import { BaseEntity } from 'src/domain/entities/base.entity';
import { UserEntity } from 'src/domain/entities/user.entity';

export type NotificationEntity = BaseEntity & {
  title: string;
  content: string;
  readAt: Date | string | null;

  userId: string;
  user?: UserEntity;
};
