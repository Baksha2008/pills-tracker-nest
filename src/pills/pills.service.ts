import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";

import { IPill } from "./interface/pill.interface";
import { CreatePillDto } from "./dto";

import { PILL_MODEL_PROVIDER } from "../constants/providers";

@Injectable()
export class PillsService {
  constructor(
    @Inject(PILL_MODEL_PROVIDER)
    private readonly pillModel: Model<IPill>
  ) {}
  public async createPill(createPillDto: CreatePillDto): Promise<IPill> {
    return await this.pillModel.create(createPillDto);
  }
  public async getPill(userId: string): Promise<IPill[]> {
    return await this.pillModel.find({ userId }).exec();
  }
  public async updatePill(
    pillid: string,
    data: CreatePillDto
  ): Promise<IPill[]> {
    return await this.pillModel.update({ _id: pillid }, data).exec();
  }
}
