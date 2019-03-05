import { NestFactory } from "@nestjs/core";
import * as config from "config";

import { AppModule } from "./app.module";

import { IConfig } from "../types/config/config";

async function bootstrap() {
  const { port }: IConfig["appConfig"] = config.get("appConfig");

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
