import { CpfRequestDto, CpfResponseDto } from '@dto';
import { CPFEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CPFRepository } from '@repositories';
import { validateCpf } from '@validators';
import { Repository } from 'typeorm';

@Injectable()
export class CpfService {
  constructor(
    @InjectRepository(CPFEntity)
    private readonly cpfRepository: CPFRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(userId: string, cpf: string): Promise<CpfResponseDto> {
    const newCpf = this.cpfRepository.create({ userId, value: cpf });
    await this.cpfRepository.save(newCpf);

    return { value: newCpf.value, createdAt: newCpf.createdAt };
  }

  async update(idCpf: string): Promise<any> {
    await this.cpfRepository.update({ id: idCpf }, { updatedAt: new Date() });
    const { value, updatedAt } = await this.cpfRepository.findOne({
      id: idCpf,
    });

    return { value, updatedAt };
  }

  async createOrUpdate(
    { value }: CpfRequestDto,
    { authorization }: { authorization: string },
  ): Promise<CpfResponseDto[]> {
    if (!validateCpf(value)) {
      throw new HttpException('This CPF is not valid', HttpStatus.BAD_REQUEST);
    }
    const token = authorization.split(' ')[1];
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.cpfRepository.findOne({
      userId: data.id,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, value);
      const array = await this.cpfRepository.find({
        userId: data.id,
      });
      return array.map(({ value, createdAt, updatedAt }) => {
        return {
          value,
          createdAt,
          updatedAt,
        };
      });
    }
  }
}
