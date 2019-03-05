import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Response } from "express";

import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login_user.dto";
import { UsersService } from "./users.service";
import { User } from "../../types/user";

import { STATUS_MESSAGE } from "../constants/statusMessage";
import { USERS_ROUTES } from "./users.routes";

@Controller(USERS_ROUTES.main)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post(USERS_ROUTES.signUp)
  public async singUp(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const user: User | null = await this.usersService.getUser({
        email: createUserDto.email
      });
      if (user) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ data: { message: STATUS_MESSAGE.userAlredyExists } });
      }
      const hash: string = await bcrypt.hash(createUserDto.password, 10);
      const newUser: User = await this.usersService.createUser({
        ...createUserDto,
        password: hash
      });
      if (newUser) {
        const UpdateUser = {
          accessToken: newUser.accessToken,
          expiresIn: newUser.expiresIn,
          _doc: newUser._doc,
          isNew: newUser.isNew
        };
        return res.status(HttpStatus.OK).json({ data: UpdateUser });
      }
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ data: { error: STATUS_MESSAGE.unauthorized } });
    }
  }
  @Post(USERS_ROUTES.signIn)
  public async signIn(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response
  ): Promise<Response> {
    let user: User;
    try {
      user = await this.usersService.getUserWithToken({
        email: loginUserDto.email
      });
    } catch (err) {
      return res.status(403).json({ data: err });
    }
    if (
      !user ||
      (user && !(await bcrypt.compare(loginUserDto.password, user.password)))
    ) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ data: { message: STATUS_MESSAGE.unauthorized } });
    }

    return res.status(HttpStatus.OK).json({ data: user });
  }
}
