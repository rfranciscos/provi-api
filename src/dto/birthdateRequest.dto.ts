import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BirthdayRequestDto {
  @ApiProperty({ type: 'Date', example: '06/11/1996' })
  @IsNotEmpty()
  value: Date;
}
