import { ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AmountRequestedResponseDto {
  @ApiResponseProperty()
  @IsNotEmpty()
  value: number;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date;
}
