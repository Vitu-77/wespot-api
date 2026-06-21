import { UserEntity } from 'src/domain/entities/user.entity';

export type SessionEntity = {
  id: string;
  user: UserEntity;
};
