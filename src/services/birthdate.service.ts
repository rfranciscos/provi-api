import { BirthdateResponseDto, BirthdayRequestDto } from '@dto';
import { BirthdateEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BirthdateService {
  constructor(
    @InjectRepository(BirthdateEntity)
    private readonly birthdateRepo: Repository<BirthdateEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    userId: string,
    value: Date,
    token: string,
  ): Promise<BirthdateResponseDto> {
    const data = this.birthdateRepo.create({ userId, value });
    await this.birthdateRepo.save(data);

    return {
      token,
      value: value,
      createdAt: data.createdAt,
    };
  }

  async update(idBirthday: string): Promise<any> {
    await this.birthdateRepo.update(
      { id: idBirthday },
      { updatedAt: new Date() },
    );
    const { value, updatedAt } = await this.birthdateRepo.findOne({
      id: idBirthday,
    });

    return { value, updatedAt };
  }

  async createOrUpdate(
    { value }: BirthdayRequestDto,
    { authorization }: { authorization: string },
  ): Promise<BirthdateResponseDto> {
    const token = authorization.split(' ')[1];
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.birthdateRepo.findOne({
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
