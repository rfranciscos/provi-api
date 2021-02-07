import {
  FullNameRequestDto,
  FullNameResponseDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '@services';
import { FullNameService } from 'src/services/fullName.service';

@Controller('api/v1/full-name')
export class FullNameController {
  constructor(
    private readonly fullNameService: FullNameService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  public async insert(
    @Body() fullNameRequest: FullNameRequestDto,
  ): Promise<HttpResponseProtected<FullNameResponseDto[]>> {
    await this.authService.getUserPath(
      fullNameRequest.token,
      '/api/v1/full-name',
    );
    const response = await this.fullNameService.createOrUpdate(fullNameRequest);
    const nextPath = await this.authService.updatePaths(
      fullNameRequest.token,
      '/api/v1/full-name',
    );
    return {
      message: 'sucess',
      'next-end-point': nextPath,
      data: response,
    };
  }
}
