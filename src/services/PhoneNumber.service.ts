import { PhoneNumberRequestDto, PhoneNumberResponseDto } from '@dto';
import { PhoneNumberEntity } from '@entities';
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
    private readonly jwtService: JwtService,
  ) {}

  async create(
    userId: string,
    value: string,
    token: string,
  ): Promise<PhoneNumberResponseDto> {
    const data = this.phoneNumberRepo.create({ userId, value });
    await this.phoneNumberRepo.save(data);

    return {
      token,
      value,
      createdAt: data.createdAt,
    };
  }

  async update(idPhoneNumber: string): Promise<any> {
    await this.phoneNumberRepo.update(
      { id: idPhoneNumber },
      { updatedAt: new Date() },
    );
    const { value, updatedAt } = await this.phoneNumberRepo.findOne({
      id: idPhoneNumber,
    });

    return { value, updatedAt };
  }

  async createOrUpdate(
    { value }: PhoneNumberRequestDto,
    { authorization }: { authorization: string },
  ): Promise<PhoneNumberResponseDto[]> {
    if (!validadePhoneNumber(value)) {
      throw new HttpException('Invalid phone number', HttpStatus.BAD_REQUEST);
    }
    const token = authorization.split(' ')[1];
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.phoneNumberRepo.findOne({
      userId: data.id,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, value, token);
      const array = await this.phoneNumberRepo.find({
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
