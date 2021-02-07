import { BirthdateResponseDto, BirthdayRequestDto } from '@dto';
import { BirthdateEntity, UserEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BirthdateRepository, UserRepository } from '@repositories';
import { validadeBirthdate } from '@validators';

@Injectable()
export class BirthdateService {
  constructor(
    @InjectRepository(BirthdateEntity)
    private readonly birthdateRepository: BirthdateRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(userId: string, value: Date): Promise<BirthdateResponseDto> {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    const data = this.birthdateRepository.create({ user, value });
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

  async createOrUpdate({
    value,
    token,
  }: BirthdayRequestDto): Promise<BirthdateResponseDto[]> {
    if (!validadeBirthdate(value)) {
      throw new HttpException('Invalid birthdate', HttpStatus.BAD_REQUEST);
    }
    const data = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.birthdateRepository.findOne({
      user,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, new Date(value));
      const array = await this.birthdateRepository.find({
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
