import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersController } from 'src/modules/users/controllers/users.controller';
import { ListWorkspaceUsersService } from 'src/modules/users/services/list-workspace-users/list-workspace-users.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [ListWorkspaceUsersService],
})
export class UsersModule {}
