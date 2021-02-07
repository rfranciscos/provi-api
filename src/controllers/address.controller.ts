import {
  AddressRequestDto,
  AddressResponseDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddressService, AuthService } from '@services';

@Controller('api/v1/address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() addressRequest: AddressRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<AddressResponseDto[]>> {
    await this.authService.getUserPath(headers, '/api/v1/address');
    const response = await this.addressService.createOrUpdate(
      addressRequest,
      headers,
    );
    const nextPath = await this.authService.updatePaths(
      headers,
      '/api/v1/address',
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
