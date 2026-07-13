import { writeFile } from "node:fs/promises";
import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { env } from "src/env";
import { AppModule } from "./app.module";

async function setupSwagger(app: INestApplication) {
  try {
    const config = new DocumentBuilder()
      .setTitle("WeSpot API")
      .setDescription("Endpoints for WeSpot API")
      .setVersion("1.0")
      .addServer("/") // Não fixe localhost aqui
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (_, methodKey) => methodKey,
    });

    app.use(
      "/docs",
      apiReference({
        content: document,
        title: "WeSpot - API",
        theme: "purple",
        layout: "modern",
        darkMode: true,
        defaultHttpClient: {
          targetKey: "node",
          clientKey: "fetch",
        },

        searchHotKey: "k",
      }),
    );

    await writeFile("./openapi.json", JSON.stringify(document, null, 2));
  } catch {
    /** empty */
  }
}

async function setupApp() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  });

  app.enableShutdownHooks(["SIGINT", "SIGTERM", "SIGUSR2"]);

  app.enableCors({
    origin: [
      "http://localhost:3001", // Frontend Local
      "https://app.wespot.com.br", // App Frontend Prod
      "https://wespot.com.br", // Landpage Prod
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Workspace-Id"],
  });

  app.setGlobalPrefix("api/v1", {
    exclude: ["docs/*path", "swagger/*path"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await setupSwagger(app);
  await app.listen(Number(env.PORT), "0.0.0.0");
}

void setupApp();
