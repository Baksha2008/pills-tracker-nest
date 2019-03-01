import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login_user.dto";
import { UsersService } from "./users.service";
import { User } from "../../types/User/user";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post("signup")
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
          .status(401)
          .json({ data: { message: "This user already exists" } });
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
        return res.status(201).json({ data: UpdateUser });
      }
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ data: { error: "UNAUTHORIZED" } });
    }
  }
  @Post("signin")
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
        .json({ data: { message: "UNAUTHORIZED" } });
    }

    return res.status(HttpStatus.OK).json({ data: user });
  }
}
