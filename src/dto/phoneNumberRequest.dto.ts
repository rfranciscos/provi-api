import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PhoneNumberRequestDto {
  @ApiProperty({ type: 'string', example: '1199019296' })
  @IsNotEmpty()
  value: string;
}
