import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RequestDto } from './request.dto';

export class CpfRequestDto extends RequestDto {
  @ApiProperty({ type: 'string', example: '00011122233' })
  @IsNotEmpty()
  value: string;
}
