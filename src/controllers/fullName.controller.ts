import {
  FullNameRequestDto,
  FullNameResponseDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FullNameService } from 'src/services/fullName.service';

@Controller('api/v1/full-name')
export class FullNameController {
  constructor(private readonly fullNameService: FullNameService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() fullNameRequest: FullNameRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<FullNameResponseDto[]>> {
    const response = await this.fullNameService.createOrUpdate(
      fullNameRequest,
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
