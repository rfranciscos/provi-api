import { ApiProperty } from '@nestjs/swagger';

export class HttpResponse<T> {
  @ApiProperty()
  sucess: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;
}
