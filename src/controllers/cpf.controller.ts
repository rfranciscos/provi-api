import { CpfRequestDto, CpfResponseDto, HttpResponseProtected } from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, CpfService } from '@services';

@Controller('api/v1/cpf')
export class CpfController {
  constructor(
    private readonly cpfService: CpfService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() cpfRequest: CpfRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<CpfResponseDto[]>> {
    await this.authService.getUserPath(headers, '/api/v1/cpf');
    const response = await this.cpfService.createOrUpdate(cpfRequest, headers);
    const nextPath = await this.authService.updatePaths(headers, '/api/v1/cpf');

    return {
      sucess: true,
      message: 'sucess',
      'next-end-point': nextPath,
      token: headers.authorization.split(' ')[1],
      data: response,
    };
  }
}
