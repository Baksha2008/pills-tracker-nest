import { NestFactory } from "@nestjs/core";
import * as config from "config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";

import { CONFIG } from "./constants/config";

import { strings } from "./constants/strings";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(strings.options.setTitle)
    .setDescription(strings.options.setDescription)
    .setVersion(strings.options.setVersion)
    .addTag(strings.options.addTag)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT || config.get(CONFIG.port);
  await app.listen(port);
}
bootstrap();
