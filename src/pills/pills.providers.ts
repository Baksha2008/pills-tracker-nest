import { Connection } from "mongoose";

import { PillSchema } from "./schemas/pill.schema";

import { PILL_COLLECTION } from "../constants/collections";
import { MONGO_PROVIDER, PILL_MODEL_PROVIDER } from "../constants/providers";

export const pillsProviders = [
  {
    provide: PILL_MODEL_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(PILL_COLLECTION, PillSchema),
    inject: [MONGO_PROVIDER]
  }
];
