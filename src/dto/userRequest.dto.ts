import { ApiProperty } from '@nestjs/swagger';

export class UserRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
