import {
  BirthdateResponseDto,
  BirthdayRequestDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, BirthdateService } from '@services';

@Controller('api/v1/birthdate')
export class BirthdateController {
  constructor(
    private readonly birthdateService: BirthdateService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() birthdateRequest: BirthdayRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<BirthdateResponseDto[]>> {
    await this.authService.getUserPath(headers, '/api/v1/birthdate');
    const response = await this.birthdateService.createOrUpdate(
      birthdateRequest,
      headers,
    );
    const nextPath = await this.authService.updatePaths(
      headers,
      '/api/v1/birthdate',
    );
    return {
      message: 'sucess',
      'next-end-point': nextPath,
      data: response,
    };
  }
}
