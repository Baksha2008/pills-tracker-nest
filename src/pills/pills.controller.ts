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
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";

import { IPill } from "./interface/pill.interface";
import { PillsService } from "./pills.service";
import { CreatePillDto } from "./dto/pills.dto";

import { PILLS_ROUTE } from "../constants/collection";
import { ROUTES } from "../constants/routes";
import { STATUS_MESSAGE } from "../constants/statusMessage";

@Controller(PILLS_ROUTE)
export class PillsContoller {
  constructor(private readonly pillsService: PillsService) {}
  @Post()
  public async createPill(
    @Body() createPillDto: CreatePillDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const pill = await this.pillsService.createPill(createPillDto);
      return res
        .status(HttpStatus.OK)
        .json({ data: STATUS_MESSAGE.ok, item: pill });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ data: STATUS_MESSAGE.badRequest, error });
    }
  }

  @Get(ROUTES.pillId)
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
