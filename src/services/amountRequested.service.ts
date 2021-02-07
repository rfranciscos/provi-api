/* eslint-disable @typescript-eslint/no-unused-vars */
import { AmountRequestedDto, AmountRequestedResponseDto } from '@dto';
import { AmountRequestedEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AmountRequestedRepository, UserRepository } from '@repositories';

@Injectable()
export class AmountRequestedService {
  constructor(
    @InjectRepository(AmountRequestedEntity)
    private readonly amountRequestedRepository: AmountRequestedRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    user: UserEntity,
    value: number,
  ): Promise<AmountRequestedResponseDto> {
    const data = this.amountRequestedRepository.create({
      user,
      value,
    });
    const { id, user: _, ...rest } = await this.amountRequestedRepository.save(
      data,
    );

    return rest;
  }

  async update(idAmountRequested: string): Promise<any> {
    await this.amountRequestedRepository.update(
      { id: idAmountRequested },
      { updatedAt: new Date() },
    );
    const {
      id,
      user: _,
      ...rest
    } = await this.amountRequestedRepository.findOne({
      id: idAmountRequested,
    });

    return rest;
  }

  async createOrUpdate({
    value,
    token,
  }: AmountRequestedDto): Promise<AmountRequestedResponseDto> {
    const data = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.amountRequestedRepository.findOne({
      user,
      value,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      return await this.create(user, value);
    }
  }
}
