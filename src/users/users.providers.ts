import { Connection } from "mongoose";

import { UserSchema } from "./schemas/user.schema";

import {
  USER_MODEL_TOKEN,
  USER,
  DB_CONNECTION_TOKEN
} from "./constants/constatnts";

export const usersProviders = [
  {
    provide: USER_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model(USER, UserSchema),
    inject: [DB_CONNECTION_TOKEN]
  }
];
