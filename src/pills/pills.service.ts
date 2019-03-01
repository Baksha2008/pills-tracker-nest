import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { IPill } from "./interface/pill.interface";
import { CreatePillDto, GetPillsDto } from "./dto";

@Injectable()
export class PillsService {
  constructor(
    @Inject("PillModelToken")
    private readonly pillMode: Model<IPill>
  ) {}
  public async createPill(createPillDto: CreatePillDto): Promise<IPill> {
    return await this.pillMode.create(createPillDto);
  }
  public async getPill(userId: string): Promise<IPill[]> {
    return await this.pillMode.find({userId}).exec();
  }
}
