import { Module } from "@nestjs/common";
import { PillsContoller } from "./pills.controller";
import { PillsService } from "./pills.service";
import { pillsProviders } from "./pills.providers";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [PillsContoller],
  providers: [PillsService, ...pillsProviders]
})
export class PillsModule {}
