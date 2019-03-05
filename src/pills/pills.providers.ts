import { Connection } from "mongoose";

import { PillSchema } from "./schemas/pill.schema";

import { DB_PROVIDERS, PILL } from "./constants/constants.db";
import { DB_CONNECTION_TOKEN } from "../constants/constants.db";

export const pillsProviders = [
  {
    provide: DB_PROVIDERS,
    useFactory: (connection: Connection) => connection.model(PILL, PillSchema),
    inject: [DB_CONNECTION_TOKEN]
  }
];
