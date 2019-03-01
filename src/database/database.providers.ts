import * as mongoose from "mongoose";

export const databaseProviders = [
  {
    provide: "DbConnectionToken",
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        "mongodb+srv://test:12345@test-n5e25.mongodb.net/test?retryWrites=true"
      )
  }
];
