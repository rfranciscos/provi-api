import { BirthdateResponseDto, BirthdayRequestDto, HttpResponse } from '@dto';
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
  ): Promise<HttpResponse<BirthdateResponseDto[]>> {
    const response = await this.birthdateService.createOrUpdate(
      birthdateRequest,
      headers,
    );
    return {
      sucess: true,
      message: 'sucess',
      data: response,
    };
  }
}
