import { ApiResponseProperty } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiResponseProperty()
  street: string;

  @ApiResponseProperty()
  number: string;

  @ApiResponseProperty()
  complement?: string;

  @ApiResponseProperty()
  city: string;

  @ApiResponseProperty()
  state: string;

  @ApiResponseProperty()
  cep: string;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date;
}
