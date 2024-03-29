import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RequestDto } from './request.dto';

export class AmountRequestedDto extends RequestDto {
  @ApiProperty({ type: 'number', example: '1000.23' })
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
