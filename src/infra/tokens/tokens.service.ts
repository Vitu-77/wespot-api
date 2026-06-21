import { Injectable, UnauthorizedException } from '@nestjs/common';
import argon, { type Options as ArgonOptions } from '@node-rs/argon2';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { SessionEntity } from 'src/domain/entities/session.entity';
import { env } from 'src/env';
import { UserEntity } from 'src/domain/entities/user.entity';

type JwtAlgorithm = NonNullable<JwtSignOptions['algorithm']>;

@Injectable()
export class TokensService {
  public SECRET = env.PASSWORD_SECRET;
  public PEPPER = env.PASSWORD_PEPPER;
  public JWT_ALGORITHM: JwtAlgorithm = 'HS256';
  public ARGON_OPTIONS: ArgonOptions = {
    algorithm: 2,
    memoryCost: 1024 * 8,
    timeCost: 3,
  };

  constructor(private readonly jwtService: JwtService) {}

  private insertPepper(rawText: string) {
    return `${rawText}::${this.PEPPER}`;
  }

  async hashPassword(rawText: string) {
    return argon.hash(this.insertPepper(rawText), this.ARGON_OPTIONS);
  }

  async compareHash(hash: string, password: string) {
    return argon.verify(hash, this.insertPepper(password), this.ARGON_OPTIONS);
  }

  async decodeAuthToken(token: string): Promise<SessionEntity | null> {
    const tk = token.replace('Bearer ', '');

    if (!tk) {
      throw new UnauthorizedException('Auth token is missing or invalid');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        algorithms: [this.JWT_ALGORITHM],
      });

      if (!payload) {
        return null;
      }

      return payload as SessionEntity;
    } catch {
      throw new UnauthorizedException('Auth token is missing or invalid');
    }
  }

  createAuthTokens(data: UserEntity) {
    const accessTokenExpiresIn = 60 * 60 * 60; // 1 hour
    const refreshTokenExpiresIn = accessTokenExpiresIn * 24 * 30; // 30 days
    const options = { secret: this.SECRET, algorithm: this.JWT_ALGORITHM };

    const accessToken = this.jwtService.sign(data, {
      ...options,
      expiresIn: accessTokenExpiresIn,
    });

    const refreshToken = this.jwtService.sign(data, {
      ...options,
      expiresIn: refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateDisposableEmail(email: string) {}
}
