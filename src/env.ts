import 'dotenv/config';
import { PrismaMode } from 'prisma.config';

import z from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  PRISMA_MODE: z.enum(PrismaMode),
  POSTGRES_DB: z.string(),
  APP_ENV: z.enum(['development', 'production']),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_HOST: z.string(),
  REDIS_HOST: z.string(),
  DATABASE_URL: z.string(),
  REDIS_PORT: z.coerce.number(),
});

export type EnvType = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
