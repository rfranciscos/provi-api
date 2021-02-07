import { ApiProperty } from '@nestjs/swagger';

export class HttpResponseProtected<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  'next-end-point': string;

  @ApiProperty()
  data: T;
}
