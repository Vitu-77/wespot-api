import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvType, envSchema } from "src/env";
import { ArgonModule } from "src/infra/argon/argon.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { EmailModule } from "src/infra/email/email.module";
import { RedisModule } from "src/infra/redis/redis.module";
import { StorageModule } from "src/infra/storage/storage..module";
import { AccountsModule } from "src/modules/accounts/accounts.module";
import { DocsModule } from "src/modules/docs/docs.module";
import { NotificationsModule } from "src/modules/notifications/notifications.module";
import { WorkspacesModule } from "src/modules/workspaces/workspaces.module";

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
    AccountsModule,
    DocsModule,
    NotificationsModule,
    WorkspacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
