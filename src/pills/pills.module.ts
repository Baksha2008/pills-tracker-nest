import { Module } from "@nestjs/common";
import { PillsContoller } from "./pills.controller";
import { PillsService } from "./pills.service";
import { pillsProviders } from "./pills.providers";
import { DatabaseModule } from "../database/database.module";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "src/users/users.module";

@Module({
  imports: [DatabaseModule, PassportModule, UsersModule],
  controllers: [PillsContoller],
  providers: [PillsService, ...pillsProviders]
})
export class PillsModule {}
