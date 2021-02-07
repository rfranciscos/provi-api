import {
  FullNameRequestDto,
  FullNameResponseDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@services';
import { FullNameService } from 'src/services/fullName.service';

@Controller('api/v1/full-name')
export class FullNameController {
  constructor(
    private readonly fullNameService: FullNameService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() fullNameRequest: FullNameRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<FullNameResponseDto[]>> {
    await this.authService.getUserPath(headers, '/api/v1/full-name');
    const response = await this.fullNameService.createOrUpdate(
      fullNameRequest,
      headers,
    );
    const nextPath = await this.authService.updatePaths(
      headers,
      '/api/v1/full-name',
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
