import { AmountRequestedDto, HttpResponseProtected } from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AmountRequestedService, AuthService } from '@services';

@Controller('api/v1/amount-requested')
export class AmountRequestedController {
  constructor(
    private readonly amountRequested: AmountRequestedService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() amountRequestedRequest: AmountRequestedDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<AmountRequestedDto[]>> {
    await this.authService.getUserPath(headers, '/api/v1/amount-requested');
    const response = await this.amountRequested.createOrUpdate(
      amountRequestedRequest,
      headers,
    );
    const nextPath = await this.authService.updatePaths(
      headers,
      '/api/v1/amount-requested',
    );

    return {
      sucess: true,
      message: 'sucess',
      'next-end-point': nextPath,

      token: headers.authorization.split(' ')[1],
      data: response,
    };
  }
}
