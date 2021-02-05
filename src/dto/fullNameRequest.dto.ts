import { IsNotEmpty } from 'class-validator';

export class FullNameRequestDto {
  @IsNotEmpty()
  fullName: string;
}
