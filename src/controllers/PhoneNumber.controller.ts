import {
  HttpResponseProtected,
  PhoneNumberRequestDto,
  PhoneNumberResponseDto,
} from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PhoneNumberService } from '@services';

@Controller('api/v1/phone-number')
export class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() phoneNumberRequest: PhoneNumberRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<PhoneNumberResponseDto[]>> {
    const response = await this.phoneNumberService.createOrUpdate(
      phoneNumberRequest,
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
