import { Injectable } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { SessionEntity } from 'src/domain/entities/session.entity'
import { UserEntity } from 'src/domain/entities/user.entity'
import { AuthTokenType } from 'src/domain/enums/auth-token-type.enum'

import { env } from 'src/env'
import { ArgonService } from 'src/infra/argon/argon.service'
import { RedisService } from 'src/infra/redis/redis.service'

type JwtAlgorithm = NonNullable<JwtSignOptions['algorithm']>

export type AccessTokenPayload = {
  sub: string
  type: AuthTokenType.ACCESS
}

export type RefreshTokenPayload = {
  sub: string
  type: AuthTokenType.REFRESH
}

@Injectable()
export class CreateSessionService {
  private readonly SECRET = env.HASH_SECRET
  private readonly JWT_ALGORITHM: JwtAlgorithm = 'HS256'

  private readonly ACCESS_TOKEN_EXPIRES_IN = 60 * 60 // 1h
  private readonly REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 30 // 30d

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly argonService: ArgonService,
  ) {}

  async execute(user: UserEntity) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        type: AuthTokenType.ACCESS,
      },
      {
        secret: this.SECRET,
        algorithm: this.JWT_ALGORITHM,
        expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
      },
    )

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        type: AuthTokenType.REFRESH,
      },
      {
        secret: this.SECRET,
        algorithm: this.JWT_ALGORITHM,
        expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
      },
    )

    const session: SessionEntity = {
      userId: user.id,
      refreshTokenHash: await this.argonService.hashString(refreshToken),
      createdAt: new Date(),
    }

    await this.redisService.del(`session:${user.id}`)
    await this.redisService.set(
      `session:${user.id}`,
      JSON.stringify(session),
      this.REFRESH_TOKEN_EXPIRES_IN,
    )

    return {
      accessToken,
      refreshToken,
      session,
    }
  }
}
