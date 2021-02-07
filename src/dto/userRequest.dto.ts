import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRequestDto {
  @ApiProperty({ type: 'string', example: 'name@domain.com.br' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', example: 'AcrediteNoCodigo' })
  @IsNotEmpty()
  password: string;

  paths: { path: string; nextPath: string }[];
}
