import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository';
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace-repository/workspace.repository';
import { SpotRepository } from 'src/infra/database/repositories/spot-repository/spot.repository';
import { InviteRepository } from 'src/infra/database/repositories/invite-repository/invite.repository';
import { NotificationRepository } from 'src/infra/database/repositories/notification-repository/notification.repository';

const REPOSITORIES = [
  UserRepository,
  WorkspaceRepository,
  SpotRepository,
  InviteRepository,
  NotificationRepository,
];

@Global()
@Module({
  providers: [PrismaService, ...REPOSITORIES],
  exports: [PrismaService, ...REPOSITORIES],
})
export class DatabaseModule {}
