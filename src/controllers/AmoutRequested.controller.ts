import { AmountRequestedDto, HttpResponseProtected } from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AmountRequestedService } from '@services';

@Controller('api/v1/amount-requested')
export class AmountRequestedController {
  constructor(private readonly amountRequested: AmountRequestedService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() amountRequestedRequest: AmountRequestedDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<AmountRequestedDto[]>> {
    const response = await this.amountRequested.createOrUpdate(
      amountRequestedRequest,
      headers,
    );
    return {
      sucess: true,
      message: 'sucess',
      token: headers.authorization.split(' ')[1],
      data: response,
    };
  }
}
