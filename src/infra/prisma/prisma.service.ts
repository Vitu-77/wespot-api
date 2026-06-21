import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'prisma-types/client';
import { env } from 'src/env';

const config = {
  schema: 'public',
  sslmode: env.APP_ENV === 'development' ? undefined : 'verify-full',
  // sslrootcert:
  //   env.APP_ENV === 'development' ? undefined : '/app/certs/rds-ca.pem',
};

const configParams = new URLSearchParams(config as any).toString();
const connectionString = `tkplay://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}?${configParams}`;
const adapter = new PrismaPg({ connectionString });

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      adapter,
      log: ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
