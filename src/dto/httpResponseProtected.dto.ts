import { ApiResponseProperty } from '@nestjs/swagger';

export class HttpResponseProtected<T> {
  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  'next-end-point': string;

  @ApiResponseProperty()
  data: T;
}
