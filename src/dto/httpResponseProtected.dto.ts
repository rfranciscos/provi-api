import { ApiProperty } from '@nestjs/swagger';

export class HttpResponseProtected<T> {
  @ApiProperty()
  sucess: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  data: T;
}
