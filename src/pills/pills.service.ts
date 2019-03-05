import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { IPill } from "./interface/pill.interface";
import { CreatePillDto } from "./dto";

@Injectable()
export class PillsService {
  constructor(
    @Inject("PillModelToken")
    private readonly pillModel: Model<IPill>
  ) {}
  public async createPill(createPillDto: CreatePillDto): Promise<IPill> {
    return await this.pillModel.create(createPillDto);
  }
  public async getPill(userId: string): Promise<IPill[]> {
    return await this.pillModel.find({ userId }).exec();
  }
  public async updatePill(
    pillId: string,
    data: CreatePillDto
  ): Promise<IPill[]> {
    return await this.pillModel.update({ _id: pillId }, data).exec();
  }
}
