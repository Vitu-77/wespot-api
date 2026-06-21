import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { envSchema, EnvType } from 'src/env';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { DatabaseDiagramModule } from 'src/modules/database-diagram/database-diagram.module';
import { SpotsModule } from 'src/modules/spots/spots.module';

@Module({
  imports: [
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

    PrismaModule,

    DatabaseDiagramModule,
    SpotsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
