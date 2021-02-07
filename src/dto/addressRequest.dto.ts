import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RequestDto } from './request.dto';

export class AddressRequestDto extends RequestDto {
  @ApiProperty({ type: 'string', example: 'Avenida do João' })
  @IsNotEmpty()
  street: string;

  @ApiProperty({ type: 'string', example: '1000' })
  @IsNotEmpty()
  number: string;

  @ApiProperty({ required: false, type: 'string', example: 'Fundos' })
  complement?: string;

  @ApiProperty({ type: 'string', example: 'São Paulo' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: 'string', example: 'SP' })
  @IsNotEmpty()
  state: string;

  @ApiProperty({ type: 'string', example: '03323000' })
  @IsNotEmpty()
  cep: string;
}
