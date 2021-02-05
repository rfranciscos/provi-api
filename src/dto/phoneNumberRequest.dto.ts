import { IsNotEmpty } from 'class-validator';

export class PhoneNumberRequestDto {
  @IsNotEmpty()
  value: string;
}
