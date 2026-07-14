import { Injectable } from "@nestjs/common";
import { RedisService } from "src/infra/redis/redis.service";
import { DefaultSuccessResponseDto } from "src/shared/dto/default-success-response.dto";

@Injectable()
export class SignoutService {
  constructor(private readonly redisService: RedisService) {}

  async execute(userId: string): Promise<DefaultSuccessResponseDto> {
    await this.redisService.del(`session:${userId}`);
    return { success: true };
  }
}
