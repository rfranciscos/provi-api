import { ApiProperty } from '@nestjs/swagger';

export class BirthdateResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  value: Date;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
