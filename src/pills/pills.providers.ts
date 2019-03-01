import { Connection } from "mongoose";
import { PillSchema } from "./schemas/pill.schema";

export const pillsProviders = [
  {
    provide: "PillModelToken",
    useFactory: (connection: Connection) =>
      connection.model("pill", PillSchema),
    inject: ["DbConnectionToken"]
  }
];
