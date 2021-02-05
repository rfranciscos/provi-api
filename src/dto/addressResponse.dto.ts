import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty()
  token?: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  complement?: string;
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
