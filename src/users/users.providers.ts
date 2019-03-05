import { Connection } from "mongoose";

import { UserSchema } from "./schemas/user.schema";

import { DB_PROVIDERS, USER } from "./constants/constatnts.db";
import { DB_CONNECTION_TOKEN } from "../constants/constants.db";

export const usersProviders = [
  {
    provide: DB_PROVIDERS,
    useFactory: (connection: Connection) => connection.model(USER, UserSchema),
    inject: [DB_CONNECTION_TOKEN]
  }
];
