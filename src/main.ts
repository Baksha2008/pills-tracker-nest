import { NestFactory } from "@nestjs/core";
import * as config from "config";

import { AppModule } from "./app.module";

import { CONFIG } from "./constants/config";

async function bootstrap() {
  const port = config.get(CONFIG.port);
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
