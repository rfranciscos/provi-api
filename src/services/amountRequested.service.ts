/* eslint-disable @typescript-eslint/no-unused-vars */
import { AmountRequestedDto, AmountRequestedResponseDto } from '@dto';
import { AmountRequestedEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AmountRequestedRepository } from 'src/repositories/amountRequested.repository';

@Injectable()
export class AmountRequestedService {
  constructor(
    @InjectRepository(AmountRequestedEntity)
    private readonly amountRequestedRepository: AmountRequestedRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    userId: string,
    value: number,
  ): Promise<AmountRequestedResponseDto> {
    const newAmountRequested = this.amountRequestedRepository.create({
      userId,
      value,
    });
    await this.amountRequestedRepository.save(newAmountRequested);

    return {
      createdAt: newAmountRequested.createdAt,
      value: newAmountRequested.value,
    };
  }

  async update(idAmountRequested: string): Promise<any> {
    await this.amountRequestedRepository.update(
      { id: idAmountRequested },
      { updatedAt: new Date() },
    );
    const { updatedAt, value } = await this.amountRequestedRepository.findOne({
      id: idAmountRequested,
    });

    return { value, updatedAt };
  }

  async createOrUpdate({
    value,
    token,
  }: AmountRequestedDto): Promise<AmountRequestedResponseDto[]> {
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.amountRequestedRepository.findOne({
      userId: data.id,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, value);
      const array = await this.amountRequestedRepository.find({
        userId: data.id,
      });
      return array.map(({ id, userId, ...rest }) => rest);
    }
  }
}
