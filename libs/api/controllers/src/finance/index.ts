import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiHeaders,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CreatePaymentDto, StatusPaymentDto } from "@uninus/api/dto";
import { JwtAuthGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/pipes";
import { Controller, Get, Post, Body, UseGuards, Query, Request } from "@nestjs/common";
import {
  EFilterGraph,
  TCreatePaymentRequest,
  TPaymentCallbackRequest,
  TReqToken,
  TStatusPaymentRequest,
  TVSHeaderFinance,
  VSCreatePayment,
  VSStatusPayment,
} from "@uninus/entities";
import { RequestHeaders } from "@uninus/api/decorators";
import { VSHeaderFinance } from "@uninus/entities";
import { FinanceService } from "@uninus/api/services";

@ApiTags("Finance")
@ApiBearerAuth("bearer")
@Controller("finance")
export class FinanceController {
  constructor(private readonly appService: FinanceService) {}

  @ApiOperation({ summary: "Get Data Finance Summary" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @ApiQuery({ name: "filter", enum: EFilterGraph, required: false })
  @ApiQuery({ name: "start_date", required: false })
  @ApiQuery({ name: "end_date", required: false })
  @Get("/payment/sumary")
  async financeSummary(
    @Query("filter") filter: EFilterGraph,
    @Query("start_date") start_date: string,
    @Query("end_date") end_date: string,
  ) {
    return await this.appService.financeSummary({ filter, start_date, end_date });
  }

  @ApiOperation({ summary: "Create Payment" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @ApiBody({ type: CreatePaymentDto })
  @Post("/payment/create")
  @UseGuards(JwtAuthGuard)
  async createPayment(
    @Body(new ZodValidationPipe(VSCreatePayment)) payload: TCreatePaymentRequest,
    @Request() reqToken: TReqToken,
  ) {
    const { sub: userId } = reqToken.user;
    return await this.appService.createPayment({ userId, ...payload });
  }

  @ApiOperation({ summary: "Check Status Payment" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @ApiBody({ type: StatusPaymentDto })
  @Post("/payment/status")
  @UseGuards(JwtAuthGuard)
  async statusPayment(
    @Body(new ZodValidationPipe(VSStatusPayment)) payload: TStatusPaymentRequest,
    @Request() reqToken: TReqToken,
  ) {
    const { sub: userId } = reqToken.user;
    return await this.appService.statusPayment({ userId, ...payload });
  }

  @ApiHeaders([
    {
      name: "timestamp",
      required: true,
    },
    {
      name: "signature",
      required: true,
    },
  ])
  @Post("callback")
  async callback(
    @RequestHeaders(new ZodValidationPipe(VSHeaderFinance)) headers: TVSHeaderFinance,
    @Body() payload: TPaymentCallbackRequest,
  ) {
    const { timestamp, authorization, signature } = headers;
    return await this.appService.callback({ timestamp, authorization, signature, ...payload });
  }
}
