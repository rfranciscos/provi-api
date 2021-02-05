import { ApiProperty } from '@nestjs/swagger';

export class BirthdateResponseDto {
  @ApiProperty()
  value: Date;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
