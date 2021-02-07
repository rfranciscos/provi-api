import {
  AddressRequestDto,
  AddressResponseDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post, UseGuards } from '@nestjs/common';
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
  ): Promise<HttpResponseProtected<AddressResponseDto[]>> {
    await this.authService.getUserPath(addressRequest.token, '/api/v1/address');
    const response = await this.addressService.createOrUpdate(addressRequest);
    const nextPath = await this.authService.updatePaths(
      addressRequest.token,
      '/api/v1/address',
    );

    return {
      message: 'sucess',
      'next-end-point': nextPath,
      data: response,
    };
  }
}
