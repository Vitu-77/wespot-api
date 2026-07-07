import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum'
import { RedisService } from 'src/infra/redis/redis.service'

@Injectable()
export class EnsureAccountCreationService {
  private readonly MAX_ACCOUNTS_PER_FINGERPRINT = 3
  private readonly ONE_MONTH_IN_SECONDS = 2_592_000

  constructor(private readonly redisService: RedisService) {}

  async execute(fingerprintId: string) {
    const prefix = `account-creation:${fingerprintId}`
    const storedAccountCreations = await this.getStoredAccountCreations(prefix)

    if (storedAccountCreations.length >= this.MAX_ACCOUNTS_PER_FINGERPRINT) {
      throw new UnauthorizedException(
        'This fingerprint has reached the limit of account creations',
        {
          description: ErrorCodes.FINGERPRINT_LOCKED,
        },
      )
    }

    await this.redisService.set(
      `${prefix}:${Date.now()}`,
      '1',
      this.ONE_MONTH_IN_SECONDS,
    )
  }

  private async getStoredAccountCreations(prefix: string) {
    let cursor = '0'
    const values: string[] = []

    do {
      const [nextCursor, batch] = await this.redisService.instance.scan(
        cursor,
        'MATCH',
        `${prefix}:*`,
        'COUNT',
        100,
      )

      cursor = nextCursor
      values.push(...batch)
    } while (
      cursor !== '0' &&
      values.length <= this.MAX_ACCOUNTS_PER_FINGERPRINT
    )

    return values
  }
}
