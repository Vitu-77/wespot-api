import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Redis } from 'ioredis'
import { env } from 'src/env'
import { logger } from 'src/shared/utils/logger'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis

  constructor() {
    this.client = new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      tls: env.APP_ENV === 'development' ? undefined : {},
      connectTimeout: 10000,
      enableReadyCheck: true,
    })

    this.client.on('error', (error) => {
      logger.error(error, 'Redis error')
    })
  }

  async onModuleInit() {
    if (
      ['reconnecting', 'connecting', 'connect', 'ready'].includes(
        this.client.status,
      )
    ) {
      return
    }

    await this.client.connect()
    logger.info('Redis connected')
  }

  async onModuleDestroy() {
    await this.client.quit()
    logger.info('Redis disconnected')
  }

  get instance(): Redis {
    return this.client
  }

  async get(key: string) {
    return this.client.get(key)
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds)
      return
    }

    await this.client.set(key, value)
  }

  async del(key: string) {
    return this.client.del(key)
  }

  async exists(key: string) {
    return this.client.exists(key)
  }

  async expire(key: string, ttlSeconds: number) {
    return this.client.expire(key, ttlSeconds)
  }
}
