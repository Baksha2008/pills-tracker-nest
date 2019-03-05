import { Connection } from "mongoose";

import { UserSchema } from "./schemas/user.schema";

import { USER_COLLECTION } from "../constants/collections";
import { MONGO_PROVIDER, USER_MODEL_PROVIDER } from "../constants/providers";

export const usersProviders = [
  {
    provide: USER_MODEL_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(USER_COLLECTION, UserSchema),
    inject: [MONGO_PROVIDER]
  }
];
