import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { UserRepository } from 'src/infra/database/repositories/user.repository';
import { WorkspaceRepository } from 'src/infra/database/repositories/workspace.repository';
import { SpotRepository } from 'src/infra/database/repositories/spot.repository';

const REPOSITORIES = [UserRepository, WorkspaceRepository, SpotRepository];

@Global()
@Module({
  providers: [PrismaService, ...REPOSITORIES],
  exports: [PrismaService, ...REPOSITORIES],
})
export class DatabaseModule {}
