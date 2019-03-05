import * as mongoose from "mongoose";
import * as config from "config";

import { DB_CONNECTION_TOKEN } from "../constants/constants.db";
import { CONFIG } from "../constants/config";

const { path } = config.get(CONFIG.appConfig);

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(path, { useNewUrlParser: true })
  }
];
