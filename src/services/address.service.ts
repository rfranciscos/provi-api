/* eslint-disable @typescript-eslint/no-unused-vars */
import { Address, AddressRequestDto, AddressResponseDto } from '@dto';
import { AddressEntity, UserEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@repositories';
import { Repository } from 'typeorm';
import { CepService } from './CEP.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepo: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cepService: CepService,
  ) {}

  async create(
    user: UserEntity,
    address: Address,
  ): Promise<AddressResponseDto> {
    const newAddress = this.addressRepo.create({ user, ...address });
    return this.addressRepo.save(newAddress);
  }

  async update(idAddress: string): Promise<AddressResponseDto> {
    await this.addressRepo.update({ id: idAddress }, { updatedAt: new Date() });
    return await this.addressRepo.findOne({
      id: idAddress,
    });
  }

  async createOrUpdate(input: AddressRequestDto): Promise<AddressResponseDto> {
    const { token, ...address } = input;
    const data = await this.jwtService.verifyAsync(token);
    const isValid = await this.cepService.validade(address);
    if (!isValid) {
      throw new HttpException('inconsistent address', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.addressRepo.findOne({
      user,
      ...address,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      return await this.create(user, address);
    }
  }
}
