import { IsNotEmpty } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
