import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
import { IPill } from "./interface/pill.interface";
import { PillsService } from "./pills.service";
import { CreatePillDto } from "./dto/pills.dto";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";

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
  @UseGuards(AuthGuard())
  public async getPills(@Param() params): Promise<IPill[]> {
    return this.pillsService.getPill(params.userId);
  }
  @Put(":pillId")
  public async updatePill(
    @Req() req,
    @Body() data: CreatePillDto,
    @Res() res
  ): Promise<IPill[]> {
    try {
      const update = await this.pillsService.updatePill(
        req.params.pillId,
        data
      );
      return res.status(HttpStatus.OK).json({ data: update });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: error, error });
    }
  }
}
