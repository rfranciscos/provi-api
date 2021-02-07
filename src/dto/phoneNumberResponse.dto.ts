import { ApiResponseProperty } from '@nestjs/swagger';

export class PhoneNumberResponseDto {
  @ApiResponseProperty()
  value: string;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date;
}
