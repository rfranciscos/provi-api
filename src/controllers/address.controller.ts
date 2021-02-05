import {
  AddressRequestDto,
  AddressResponseDto,
  HttpResponseProtected,
} from '@dto';
import { Controller, Body, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddressService } from '@services';

@Controller('api/v1/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard())
  @Post()
  public async insert(
    @Body() addressRequest: AddressRequestDto,
    @Headers() headers: any,
  ): Promise<HttpResponseProtected<AddressResponseDto[]>> {
    const response = await this.addressService.createOrUpdate(
      addressRequest,
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
