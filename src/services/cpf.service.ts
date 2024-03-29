/* eslint-disable @typescript-eslint/no-unused-vars */
import { CpfRequestDto, CpfResponseDto } from '@dto';
import { CPFEntity, UserEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CPFRepository, UserRepository } from '@repositories';
import { validateCpf } from '@validators';

@Injectable()
export class CpfService {
  constructor(
    @InjectRepository(CPFEntity)
    private readonly cpfRepository: CPFRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: UserEntity, cpf: string): Promise<CpfResponseDto> {
    const newCpf = this.cpfRepository.create({ user, value: cpf });
    const { id, user: _, ...rest } = await this.cpfRepository.save(newCpf);
    return rest;
  }

  async update(idCpf: string): Promise<CpfResponseDto> {
    await this.cpfRepository.update({ id: idCpf }, { updatedAt: new Date() });
    const { id, user: _, ...rest } = await this.cpfRepository.findOne({
      id: idCpf,
    });
    return rest;
  }

  async createOrUpdate({
    value,
    token,
  }: CpfRequestDto): Promise<CpfResponseDto> {
    const data = await this.jwtService.verifyAsync(token);
    if (!validateCpf(value)) {
      throw new HttpException('This CPF is not valid', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.cpfRepository.findOne({
      user,
      value: value.replace(/[^\d]/g, ''),
    });

    if (response) {
      return this.update(response.id);
    } else {
      return this.create(user, value);
    }
  }
}
