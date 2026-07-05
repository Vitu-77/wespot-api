import 'dotenv/config';
import { PrismaMode } from 'prisma.config';

import z from 'zod';

const commonSchema = z.object({
  PORT: z.coerce.number(),
  FRONTEND_URL: z.url(),
  PRISMA_MODE: z.enum(PrismaMode),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_HOST: z.string(),
  REDIS_HOST: z.string(),
  DATABASE_URL: z.string(),
  REDIS_PORT: z.coerce.number(),
  HASH_SECRET: z.string().min(64),
  HASH_PEPPER: z.string().min(64),
  GOOGLE_OAUTH_CLIENT_ID: z.string(),
  RESEND_API_KEY: z.string(),
  SUPPORT_EMAIL_SENDER: z.email(),

  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET: z.string(),
});

export const envSchema = z.discriminatedUnion('APP_ENV', [
  commonSchema.extend({
    APP_ENV: z.literal('development'),

    AWS_S3_ENDPOINT: z.url(),
    AWS_S3_FORCE_PATH_STYLE: z.coerce.boolean(),
  }),

  commonSchema.extend({
    APP_ENV: z.literal('production'),

    AWS_S3_ENDPOINT: z.url().optional(),
    AWS_S3_FORCE_PATH_STYLE: z.coerce.boolean().default(false),
  }),
]);

export type EnvType = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
