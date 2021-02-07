import {
  HttpResponseProtected,
  PhoneNumberRequestDto,
  PhoneNumberResponseDto,
} from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, PhoneNumberService } from '@services';

@Controller('api/v1/phone-number')
export class PhoneNumberController {
  constructor(
    private readonly phoneNumberService: PhoneNumberService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() phoneNumberRequest: PhoneNumberRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<PhoneNumberResponseDto[]>> {
    await this.authService.getUserPath(headers, '/api/v1/phone-number');
    const response = await this.phoneNumberService.createOrUpdate(
      phoneNumberRequest,
      headers,
    );
    const nextPath = await this.authService.updatePaths(
      headers,
      '/api/v1/phone-number',
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
