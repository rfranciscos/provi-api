import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AmountRequestedDto {
  @ApiProperty({ type: 'number', example: '1000.23' })
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
