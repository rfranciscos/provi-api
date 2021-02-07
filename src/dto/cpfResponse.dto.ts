import { ApiResponseProperty } from '@nestjs/swagger';

export class CpfResponseDto {
  @ApiResponseProperty()
  value: string;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date;
}
