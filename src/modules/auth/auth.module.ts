import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service';

@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [CreateSessionService],
})
export class AuthModule {}
