import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as config from "config";

import { IUser } from "./intefaces/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { IConfig } from "../../types/config/config";
import { User } from "../../types/User/user";
import { JwtPayloadData } from "../../types/jwtPayloadData/jwtPayloadData";
import { ILoginUser } from "../../types/User/user";

import { USER_MODEL_TOKEN } from "./constants/constatnts";

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL_TOKEN)
    private readonly userModel: Model<IUser>
  ) {}

  public async createToken(user: User): Promise<User> {
    const { time }: IConfig["expireTime"] = config.get("expireTime");
    const { secret }: IConfig["jwtConf"] = config.get("jwtConf");
    const expiresIn: number = time + Date.now();

    const payload: JwtPayloadData = {
      email: user.email,
      expiresIn
    };

    const accessToken: string = jwt.sign(payload, secret, { expiresIn });
    return {
      ...user,
      expiresIn,
      accessToken
    };
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.userModel.create(createUserDto);
    return await this.createToken(user as User);
  }
  async validateUser(token: ILoginUser): Promise<any> {
    const payload = { email: token.email };
    return await this.getUserWithToken(payload);
  }
  public async getUser(query: any): Promise<User | null> {
    let user: User | null;
    try {
      user = await this.userModel
        .findOne(query)
        .lean()
        .exec();
    } catch (err) {
      user = null;
    }
    return user;
  }
  public async getUserWithToken(query: any): Promise<User> {
    const user: User = await this.userModel
      .findOne(query)
      .lean()
      .exec();
    return await this.createToken(user);
  }
}
