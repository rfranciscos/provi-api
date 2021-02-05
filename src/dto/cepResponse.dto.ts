import { ApiProperty } from '@nestjs/swagger';

export enum EState {
  'AC' = 'AC',
  'AL' = 'AL',
  'AP' = 'AP',
  'AM' = 'AM',
  'BA' = 'BA',
  'CE' = 'CE',
  'DF' = 'DF',
  'ES' = 'ES',
  'GO' = 'GO',
  'MA' = 'MA',
  'MT' = 'MT',
  'MS' = 'MS',
  'MG' = 'MG',
  'PA' = 'PA',
  'PB' = 'PB',
  'PR' = 'PR',
  'PE' = 'PE',
  'PI' = 'PI',
  'RJ' = 'RJ',
  'RN' = 'RN',
  'RS' = 'RS',
  'RO' = 'RO',
  'RR' = 'RR',
  'SC' = 'SC',
  'SP' = 'SP',
  'SE' = 'SE',
  'TO' = 'TO',
}

export class CepResponseDto {
  @ApiProperty()
  cep: string;

  @ApiProperty()
  state: EState;

  @ApiProperty()
  city: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  street: string;
}
