import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  HttpStatus,
  Put,
  UseGuards,
  Param,
  Req
} from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";

import { IPill } from "./interface/pill.interface";
import { PillsService } from "./pills.service";
import { CreatePillDto } from "./dto/pills.dto";

import { PILLS_ROUTES } from "./pills.routes";
import { STATUS_MESSAGE } from "../constants/statusMessage";

@ApiUseTags(PILLS_ROUTES.main)
@Controller(PILLS_ROUTES.main)
export class PillsContoller {
  constructor(private readonly pillsService: PillsService) {}
  @Post()
  @ApiOperation({ title: STATUS_MESSAGE.createPill })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: STATUS_MESSAGE.creaatePillStatus
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: STATUS_MESSAGE.createPillError
  })
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

  @Get(PILLS_ROUTES.get)
  @ApiOperation({ title: STATUS_MESSAGE.getPillsTitle })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: STATUS_MESSAGE.getPillsStatus
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: STATUS_MESSAGE.getPillError
  })
  @UseGuards(AuthGuard())
  public async getPills(@Param() params): Promise<IPill[]> {
    return this.pillsService.getPill(params.userid);
  }

  @Put(PILLS_ROUTES.put)
  @ApiOperation({ title: STATUS_MESSAGE.updatePillTitle })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: STATUS_MESSAGE.updatePillStatus
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: STATUS_MESSAGE.updatePillError
  })
  @UseGuards(AuthGuard())
  public async updatePill(
    @Req() req,
    @Body() data: CreatePillDto,
    @Res() res
  ): Promise<IPill[]> {
    try {
      const update = await this.pillsService.updatePill(
        req.params.pillid,
        data
      );
      return res.status(HttpStatus.OK).json({ data: update });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: error, error });
    }
  }
}
