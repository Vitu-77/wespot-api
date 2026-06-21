import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema, EnvType } from 'src/env';
import { AuthModule } from 'src/infra/tokens/tokens.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { AccountsModule } from 'src/modules/accounts/accounts.module';
import { DatabaseDiagramModule } from 'src/modules/database-diagram/database-diagram.module';
import { SpotsModule } from 'src/modules/spots/spots.module';

@Module({
  imports: [
    // Config-modules
    ConfigModule.forRoot<EnvType>({
      isGlobal: true,
      validate: (config) => {
        const result = envSchema.safeParse(config);

        if (!result.success) {
          throw new Error(
            `Invalid environment variables: ${result.error.message}`,
          );
        }

        return result.data;
      },
    }),

    // Infra-modules
    AuthModule,
    PrismaModule,
    RedisModule,

    // Application-modules
    AccountsModule,
    SpotsModule,
    DatabaseDiagramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
