/* eslint-disable @typescript-eslint/no-unused-vars */
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

  async create(user: UserEntity, value: Date): Promise<BirthdateResponseDto> {
    const data = this.birthdateRepository.create({ user, value });
    const { id, user: _, ...rest } = await this.birthdateRepository.save(data);
    return rest;
  }

  async update(idBirthday: string): Promise<any> {
    await this.birthdateRepository.update(
      { id: idBirthday },
      { updatedAt: new Date() },
    );
    const { id, user: _, ...rest } = await this.birthdateRepository.findOne({
      id: idBirthday,
    });
    return rest;
  }

  async createOrUpdate({
    value,
    token,
  }: BirthdayRequestDto): Promise<BirthdateResponseDto> {
    const data = await this.jwtService.verifyAsync(token);
    if (!validadeBirthdate(value)) {
      throw new HttpException('Invalid birthdate', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.birthdateRepository.findOne({
      user,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      return await this.create(user, new Date(value));
    }
  }
}
