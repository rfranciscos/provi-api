import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RequestDto } from './request.dto';

export class PhoneNumberRequestDto extends RequestDto {
  @ApiProperty({ type: 'string', example: '1199019296' })
  @IsNotEmpty()
  value: string;
}
