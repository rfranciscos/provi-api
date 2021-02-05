import { ApiProperty } from '@nestjs/swagger';

export class CpfResponseDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
