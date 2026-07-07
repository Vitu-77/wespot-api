import { Global, Module } from '@nestjs/common'
import { BrandRepository } from 'src/infra/database/repositories/brand-repository/brand.repository'
import { InviteRepository } from 'src/infra/database/repositories/invite-repository/invite.repository'
import { NotificationRepository } from 'src/infra/database/repositories/notification-repository/notification.repository'
import { SpotRepository } from 'src/infra/database/repositories/spot-repository/spot.repository'
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository'
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace-repository/workspace.repository'
import { PrismaService } from './prisma.service'

const REPOSITORIES = [
  BrandRepository,
  UserRepository,
  WorkspaceRepository,
  SpotRepository,
  InviteRepository,
  NotificationRepository,
]

@Global()
@Module({
  providers: [PrismaService, ...REPOSITORIES],
  exports: [PrismaService, ...REPOSITORIES],
})
export class DatabaseModule {}
