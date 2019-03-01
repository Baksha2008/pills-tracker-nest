import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PillsModule } from "./pills/pills.module";

@Module({
  imports: [UsersModule, PillsModule]
})
export class AppModule {}
