import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CpfRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  value: string;
}
