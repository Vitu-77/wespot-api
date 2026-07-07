import { Injectable } from "@nestjs/common";
import { RedisService } from "src/infra/redis/redis.service";

@Injectable()
export class SignoutService {
  constructor(private readonly redisService: RedisService) {}

  async execute(userId: string) {
    await this.redisService.del(`session:${userId}`);
    return { success: true };
  }
}
