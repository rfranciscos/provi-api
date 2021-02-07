import { CpfRequestDto, CpfResponseDto, HttpResponseProtected } from '@dto';
import { Controller, Body, Post } from '@nestjs/common';
import { AuthService, CpfService } from '@services';

@Controller('api/v1/cpf')
export class CpfController {
  constructor(
    private readonly cpfService: CpfService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  public async insert(
    @Body() cpfRequest: CpfRequestDto,
  ): Promise<HttpResponseProtected<CpfResponseDto>> {
    await this.authService.getUserPath(cpfRequest.token, '/api/v1/cpf');
    const response = await this.cpfService.createOrUpdate(cpfRequest);
    const nextPath = await this.authService.updatePaths(
      cpfRequest.token,
      '/api/v1/cpf',
    );

    return {
      message: 'sucess',
      'next-end-point': nextPath,
      data: response,
    };
  }
}
