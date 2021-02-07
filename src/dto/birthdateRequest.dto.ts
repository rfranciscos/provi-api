import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RequestDto } from './request.dto';

export class BirthdayRequestDto extends RequestDto {
  @ApiProperty({ type: 'Date', example: '06/11/1996' })
  @IsNotEmpty()
  value: string;
}
