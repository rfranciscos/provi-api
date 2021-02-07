/* eslint-disable @typescript-eslint/no-unused-vars */
import { PhoneNumberRequestDto, PhoneNumberResponseDto } from '@dto';
import { PhoneNumberEntity, UserEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validadePhoneNumber } from '../validators';

@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectRepository(PhoneNumberEntity)
    private readonly phoneNumberRepo: Repository<PhoneNumberEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    user: UserEntity,
    value: string,
  ): Promise<PhoneNumberResponseDto> {
    const data = this.phoneNumberRepo.create({ user, value });
    const { id, user: _, ...rest } = await this.phoneNumberRepo.save(data);
    return rest;
  }

  async update(idPhoneNumber: string): Promise<PhoneNumberResponseDto> {
    await this.phoneNumberRepo.update(
      { id: idPhoneNumber },
      { updatedAt: new Date() },
    );
    const { id, user: _, ...rest } = await this.phoneNumberRepo.findOne({
      id: idPhoneNumber,
    });
    return rest;
  }

  async createOrUpdate({
    value,
    token,
  }: PhoneNumberRequestDto): Promise<PhoneNumberResponseDto> {
    if (!validadePhoneNumber(value)) {
      throw new HttpException('Invalid phone number', HttpStatus.BAD_REQUEST);
    }
    const data = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.phoneNumberRepo.findOne({
      user,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      return this.create(user, value);
    }
  }
}
