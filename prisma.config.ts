import 'dotenv/config'
import path from 'path'
import { defineConfig } from 'prisma/config'

const env = process.env
const connectionUrl = `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}?schema=public`

export enum PrismaMode {
  CLI = 'cli',
  SERVER = 'server',
}

const migrationsPath = path.join('prisma', 'migrations')
const schemaPath =
  env.PRISMA_MODE === PrismaMode.CLI
    ? path.join('prisma')
    : path.join('prisma', 'schema.prisma')

export default defineConfig({
  schema: schemaPath,
  migrations: {
    path: migrationsPath,
  },
  datasource: {
    url: connectionUrl,
  },
})
