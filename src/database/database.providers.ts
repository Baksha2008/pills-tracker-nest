import * as mongoose from "mongoose";
import * as config from "config";

import { MONGO_PROVIDER } from "../constants/providers";
import { CONFIG } from "../constants/config";

const dbpath = config.get(CONFIG.dbpath);

export const databaseProviders = [
  {
    provide: MONGO_PROVIDER,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(dbpath, { useNewUrlParser: true })
  }
];
