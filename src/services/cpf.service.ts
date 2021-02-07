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

  async create(userId: string, cpf: string): Promise<CpfResponseDto> {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    const newCpf = this.cpfRepository.create({ user, value: cpf });
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
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.cpfRepository.findOne({
      user,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, value);
      const array = await this.cpfRepository.find({
        user,
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
