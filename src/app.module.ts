import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema, EnvType } from 'src/env';
import { ArgonModule } from 'src/infra/argon/argon.module';
import { EmailModule } from 'src/infra/email/email.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { AccountsModule } from 'src/modules/accounts/accounts.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DatabaseDiagramModule } from 'src/modules/database-diagram/database-diagram.module';
import { SpotsModule } from 'src/modules/spots/spots.module';
import { UsersModule } from 'src/modules/users/users.module';
import { NotificationsModule } from 'src/modules/notifications/notifications.module';
import { BrandsModule } from 'src/modules/brands/brands.module';
import { StorageModule } from 'src/infra/storage/storage..module';
import { WorkspacesModule } from 'src/modules/workspaces/workspaces.module';

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
    DatabaseModule,
    RedisModule,
    EmailModule,
    ArgonModule,
    StorageModule,

    // Application-modules
    AuthModule,
    AccountsModule,
    BrandsModule,
    DatabaseDiagramModule,
    NotificationsModule,
    SpotsModule,
    UsersModule,
    WorkspacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
