import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  HttpStatus,
  Req,
  Param
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { IPill } from "./interface/pill.interface";
import { PillsService } from "./pills.service";
import { CreatePillDto } from "./dto/pills.dto";
import { Response } from "express";

@Controller("pills")
export class PillsContoller {
  constructor(private readonly pillsService: PillsService) {}
  @Post()
  public async createPill(
    @Body() createPillDto: CreatePillDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const pill = await this.pillsService.createPill(createPillDto);
      return res.status(HttpStatus.OK).json({ data: "OK", item: pill });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ data: "BAD_REQUEST", error });
    }
  }

  @Get(":userId")
  public async getPills(@Param() params): Promise<IPill[]> {
    return this.pillsService.getPill(params.userId);
  }
}
