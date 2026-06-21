import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SessionEntity } from 'src/domain/entities/session.entity';
import { UserEntity } from 'src/domain/entities/user.entity';

import { env } from 'src/env';
import { RedisService } from 'src/infra/redis/redis.service';
import { HashStringService } from 'src/modules/auth/services/hash-string/hash-password.service';

type JwtAlgorithm = NonNullable<JwtSignOptions['algorithm']>;

@Injectable()
export class CreateSessionService {
  private readonly SECRET = env.HASH_SECRET;
  private readonly JWT_ALGORITHM: JwtAlgorithm = 'HS256';

  private readonly ACCESS_TOKEN_EXPIRES_IN = 60 * 60; // 1h
  private readonly REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 30; // 30d

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly hashStringService: HashStringService,
  ) {}

  async execute(user: UserEntity) {
    const sessionId = crypto.randomUUID();

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        type: 'access',
      },
      {
        secret: this.SECRET,
        algorithm: this.JWT_ALGORITHM,
        expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        sid: sessionId,
        type: 'refresh',
      },
      {
        secret: this.SECRET,
        algorithm: this.JWT_ALGORITHM,
        expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
      },
    );

    const session: SessionEntity = {
      id: sessionId,
      userId: user.id,
      refreshTokenHash: await this.hashStringService.execute(refreshToken),
      createdAt: new Date(),
    };

    await this.redisService.set(
      `session:${sessionId}`,
      JSON.stringify(session),
      this.REFRESH_TOKEN_EXPIRES_IN,
    );

    return {
      accessToken,
      refreshToken,
      session,
    };
  }
}
