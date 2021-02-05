import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddressRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  number: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  cep: string;
}
