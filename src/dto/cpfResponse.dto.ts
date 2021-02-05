import { ApiProperty } from '@nestjs/swagger';

export class CpfResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
