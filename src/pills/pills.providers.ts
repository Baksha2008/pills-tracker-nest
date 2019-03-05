import { Connection } from "mongoose";

import { PillSchema } from "./schemas/pill.schema";

import {
  PILL_MODEL_TOKEN,
  PILL,
  DB_CONNECTION_TOKEN
} from "./constants/constants";

export const pillsProviders = [
  {
    provide: PILL_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model(PILL, PillSchema),
    inject: [DB_CONNECTION_TOKEN]
  }
];
