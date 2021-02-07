import {
  BirthdateResponseDto,
  BirthdayRequestDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post, UseGuards } from '@nestjs/common';
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
  ): Promise<HttpResponseProtected<BirthdateResponseDto[]>> {
    await this.authService.getUserPath(
      birthdateRequest.token,
      '/api/v1/birthdate',
    );
    const response = await this.birthdateService.createOrUpdate(
      birthdateRequest,
    );
    const nextPath = await this.authService.updatePaths(
      birthdateRequest.token,
      '/api/v1/birthdate',
    );
    return {
      message: 'sucess',
      'next-end-point': nextPath,
      data: response,
    };
  }
}
