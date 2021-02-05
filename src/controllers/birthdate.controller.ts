import {
  BirthdateResponseDto,
  BirthdayRequestDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BirthdateService } from '@services';

@Controller('api/v1/birthdate')
export class BirthdateController {
  constructor(private readonly birthdateService: BirthdateService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() birthdateRequest: BirthdayRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<BirthdateResponseDto[]>> {
    const response = await this.birthdateService.createOrUpdate(
      birthdateRequest,
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
