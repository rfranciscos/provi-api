import { ApiResponseProperty } from '@nestjs/swagger';

export class BirthdateResponseDto {
  @ApiResponseProperty()
  value: Date;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date;
}
