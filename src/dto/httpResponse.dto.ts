import { ApiResponseProperty } from '@nestjs/swagger';

export class HttpResponse<T> {
  @ApiResponseProperty()
  sucess: boolean;

  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  data: T;
}
