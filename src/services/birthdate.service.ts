import { BirthdateResponseDto, BirthdayRequestDto } from '@dto';
import { BirthdateEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BirthdateRepository } from '@repositories';
import { validadeBirthdate } from '@validators';

@Injectable()
export class BirthdateService {
  constructor(
    @InjectRepository(BirthdateEntity)
    private readonly birthdateRepository: BirthdateRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(userId: string, value: Date): Promise<BirthdateResponseDto> {
    const data = this.birthdateRepository.create({ userId, value });
    await this.birthdateRepository.save(data);

    return {
      value: value,
      createdAt: data.createdAt,
    };
  }

  async update(idBirthday: string): Promise<any> {
    await this.birthdateRepository.update(
      { id: idBirthday },
      { updatedAt: new Date() },
    );
    const { value, updatedAt } = await this.birthdateRepository.findOne({
      id: idBirthday,
    });

    return { value, updatedAt };
  }

  async createOrUpdate(
    { value }: BirthdayRequestDto,
    { authorization }: { authorization: string },
  ): Promise<BirthdateResponseDto[]> {
    if (!validadeBirthdate(value)) {
      throw new HttpException('Invalid birthdate', HttpStatus.BAD_REQUEST);
    }
    const token = authorization.split(' ')[1];
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.birthdateRepository.findOne({
      userId: data.id,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, new Date(value));
      const array = await this.birthdateRepository.find({
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
