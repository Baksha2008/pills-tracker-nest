import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './intefaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { User } from '../../types/User/user';
import { JwtPayloadData } from '../../types/jwtPayloadData/jwtPayloadData';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModelToken')
    private readonly userModel: Model<IUser>,
  ) {}

  public async createToken(user: User): Promise<User> {
    const time = 600000000;
    const secret = 'user';
    const expiresIn: number = Date.now() + time;

    const payload: JwtPayloadData = {
      email: user.email,
      expiresIn,
    };

    const accessToken: string = jwt.sign(payload, secret, { expiresIn });
    return {
      ...user,
      expiresIn,
      accessToken,
    };
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.userModel.create(createUserDto);
    return await this.createToken(user as User);
  }
  public async validateUser(email: string): Promise<boolean> {
    const user: IUser | null = await this.userModel.findOne({
      where: { email },
    });
    if (!user) {
      return false;
    }
    return true;
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
