import { IsNotEmpty } from 'class-validator';

export class BirthdayRequestDto {
  @IsNotEmpty()
  value: Date;
}
