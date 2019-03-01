import { Document } from "mongoose";

export interface IPill extends Document {
  readonly pillName: string;
  readonly pillType: string;
  readonly pillDose: string;
}
