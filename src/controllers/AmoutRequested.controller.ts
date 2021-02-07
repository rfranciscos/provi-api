import {
  AmountRequestedDto,
  AmountRequestedResponseDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post } from '@nestjs/common';
import { AmountRequestedService, AuthService } from '@services';

@Controller('api/v1/amount-requested')
export class AmountRequestedController {
  constructor(
    private readonly amountRequested: AmountRequestedService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  public async insert(
    @Body() amountRequestedRequest: AmountRequestedDto,
  ): Promise<HttpResponseProtected<AmountRequestedResponseDto[]>> {
    await this.authService.getUserPath(
      amountRequestedRequest.token,
      '/api/v1/amount-requested',
    );
    const response = await this.amountRequested.createOrUpdate(
      amountRequestedRequest,
    );
    const nextPath = await this.authService.updatePaths(
      amountRequestedRequest.token,
      '/api/v1/amount-requested',
    );

    return {
      message: 'sucess',
      'next-end-point': nextPath,
      data: response,
    };
  }
}
