import { CepResponseDto, Address } from '@dto';
import { Injectable } from '@nestjs/common';
import { validateAddress } from '@validators';
import axios from 'axios';

@Injectable()
export class CepService {
  async get(cep: string): Promise<CepResponseDto> {
    const { data } = await axios.get(
      `https://brasilapi.com.br/api/cep/v1/${cep}`,
    );

    return data;
  }

  async validade(address: Address): Promise<boolean> {
    const apiAddress = await this.get(address.cep);
    return validateAddress(address, apiAddress);
  }
}
