import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { JwtStrategy } from "./passport/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from "src/database/database.module";
import { UsersController } from "./users.controller";
import { usersProviders } from "./users.providers";

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secretOrPrivateKey: "user",
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, ...usersProviders]
})
export class UsersModule {}
