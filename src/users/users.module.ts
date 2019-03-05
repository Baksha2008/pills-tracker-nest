import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as config from "config";
import { PassportModule } from "@nestjs/passport";

import { UsersService } from "./users.service";
import { JwtStrategy } from "./passport/jwt.strategy";
import { DatabaseModule } from "src/database/database.module";
import { UsersController } from "./users.controller";
import { usersProviders } from "./users.providers";
import { CONFIG } from "src/constants/config";

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secretOrPrivateKey: config.get(CONFIG.secret),
      signOptions: {
        expiresIn: config.get(CONFIG.expireTime)
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, ...usersProviders]
})
export class UsersModule {}
