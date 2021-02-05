import { CpfRequestDto, CpfResponseDto, HttpResponseProtected } from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CpfService } from '@services';

@Controller('api/v1/cpf')
export class CpfController {
  constructor(private readonly cpfService: CpfService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() cpfRequest: CpfRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<CpfResponseDto[]>> {
    const response = await this.cpfService.createOrUpdate(cpfRequest, headers);
    return {
      sucess: true,
      message: 'sucess',
      token: headers.authorization.split(' ')[1],
      data: response,
    };
  }
}
