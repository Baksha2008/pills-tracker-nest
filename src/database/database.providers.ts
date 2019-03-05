import * as mongoose from "mongoose";
import * as config from "config";

const { path } = config.get("DBRoute");

export const databaseProviders = [
  {
    provide: "DbConnectionToken",
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(path, { useNewUrlParser: true })
  }
];
