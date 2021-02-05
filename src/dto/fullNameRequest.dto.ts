import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FullNameRequestDto {
  @ApiProperty({ type: 'string', example: 'João da silva' })
  @IsNotEmpty()
  fullName: string;
}
