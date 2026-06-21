import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { TokensService } from 'src/infra/tokens/tokens.service';
import { RedisService } from 'src/infra/redis/redis.service';
import { SessionEntity } from 'src/domain/entities/session.entity';

@Injectable()
export class CreateSessionService {
  constructor(
    private tokensService: TokensService,
    private redisService: RedisService,
  ) {}

  async execute(user: UserEntity) {
    const sessionId = crypto.randomUUID();
    const session: SessionEntity = {
      id: sessionId,
      user,
    };
  }
}
