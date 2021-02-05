import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CpfRequestDto {
  @ApiProperty({ type: 'string', example: '00011122233' })
  @IsNotEmpty()
  value: string;
}
