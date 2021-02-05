import { ApiProperty } from '@nestjs/swagger';

export class FullNameResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
