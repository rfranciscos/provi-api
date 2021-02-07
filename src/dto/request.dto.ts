import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDto {
  @ApiProperty({ type: 'token', example: 'JWT Token' })
  @IsNotEmpty()
  token: string;
}
