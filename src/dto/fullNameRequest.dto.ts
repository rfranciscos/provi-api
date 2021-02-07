import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RequestDto } from './request.dto';

export class FullNameRequestDto extends RequestDto {
  @ApiProperty({ type: 'string', example: 'João da silva' })
  @IsNotEmpty()
  fullName: string;
}
