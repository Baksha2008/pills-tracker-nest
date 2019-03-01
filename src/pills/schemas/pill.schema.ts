import * as mongoose from "mongoose";

export const PillSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  dose: String,
  userId: String
});
