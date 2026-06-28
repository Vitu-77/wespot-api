import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/infra/redis/redis.service';

import { SignoutDto } from 'src/modules/auth/services/signout/signout.dto';

@Injectable()
export class SignoutService {
  constructor(private readonly redisService: RedisService) {}

  async execute({ userId }: SignoutDto) {
    await this.redisService.del(`session:${userId}`);
    return { success: true };
  }
}
