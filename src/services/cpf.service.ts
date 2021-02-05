import { CpfRequestDto, CpfResponseDto } from '@dto';
import { CPFEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { validateCpf } from '@validators';
import { Repository } from 'typeorm';

@Injectable()
export class CpfService {
  constructor(
    @InjectRepository(CPFEntity)
    private readonly cpfRepo: Repository<CPFEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    userId: string,
    cpf: string,
    token: string,
  ): Promise<CpfResponseDto> {
    console.log(userId);

    const newCpf = this.cpfRepo.create({ userId, value: cpf });
    await this.cpfRepo.save(newCpf);

    return { token, value: newCpf.value, createdAt: newCpf.createdAt };
  }

  async update(idCpf: string): Promise<any> {
    await this.cpfRepo.update({ id: idCpf }, { updatedAt: new Date() });
    const { value, updatedAt } = await this.cpfRepo.findOne({ id: idCpf });

    return { value, updatedAt };
  }

  async createOrUpdate(
    { value }: CpfRequestDto,
    { authorization }: { authorization: string },
  ): Promise<CpfResponseDto> {
    if (!validateCpf(value)) {
      throw new HttpException('This CPF is not valid', HttpStatus.BAD_REQUEST);
    }
    const token = authorization.split(' ')[1];
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.cpfRepo.findOne({
      userId: data.id,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      return await this.create(data.id, value, token);
    }
  }
}
