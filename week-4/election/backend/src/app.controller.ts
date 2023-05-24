import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestTokensDto } from './dtos/requestTokens.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("last-block")
  getLastBlock() {
    return this.appService.getLastBlock();
  }

  @Get("contract-address")
  getAddress() {
    return this.appService.getAddress();
  }

  @Get("total-supply")
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }

  @Get("balance/:address")
  getBalanceOf(@Param('address') address: string) {
    return this.appService.getBalanceOf(address);
  }

  @Get("transaction-receipt/")
  async getTransactionReceipt(@Query('hash') hash: string) {
    return await this.appService.getTransactionReceipt(hash);
  }

  @Post("request-tokens")
  requestTokens(@Body() body: RequestTokensDto) {
    return this.appService.requestTokens(body.address, body.signature);
  }
}