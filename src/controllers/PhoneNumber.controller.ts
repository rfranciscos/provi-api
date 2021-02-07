import {
  HttpResponseProtected,
  PhoneNumberRequestDto,
  PhoneNumberResponseDto,
} from '@dto';
import { Controller, Body, Post } from '@nestjs/common';
import { AuthService, PhoneNumberService } from '@services';

@Controller('api/v1/phone-number')
export class PhoneNumberController {
  constructor(
    private readonly phoneNumberService: PhoneNumberService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  public async insert(
    @Body() phoneNumberRequest: PhoneNumberRequestDto,
  ): Promise<HttpResponseProtected<PhoneNumberResponseDto[]>> {
    await this.authService.getUserPath(
      phoneNumberRequest.token,
      '/api/v1/phone-number',
    );
    const response = await this.phoneNumberService.createOrUpdate(
      phoneNumberRequest,
    );
    const nextPath = await this.authService.updatePaths(
      phoneNumberRequest.token,
      '/api/v1/phone-number',
    );

    return {
      message: 'sucess',
      'next-end-point': nextPath,
      data: response,
    };
  }
}
