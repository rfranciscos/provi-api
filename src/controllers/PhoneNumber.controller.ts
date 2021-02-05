import {
  HttpResponse,
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
  ): Promise<HttpResponse<PhoneNumberResponseDto[]>> {
    const response = await this.phoneNumberService.createOrUpdate(
      phoneNumberRequest,
      headers,
    );
    return {
      sucess: true,
      message: 'sucess',
      data: response,
    };
  }
}
