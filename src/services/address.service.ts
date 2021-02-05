/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddressRequestDto, AddressResponseDto } from '@dto';
import { AddressEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CepService } from './CEP.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepo: Repository<AddressEntity>,
    private readonly jwtService: JwtService,
    private readonly cepService: CepService,
  ) {}

  async create(
    userId: string,
    address: AddressRequestDto,
    token: string,
  ): Promise<AddressResponseDto> {
    const newAddress = this.addressRepo.create({ userId, ...address });
    await this.addressRepo.save(newAddress);

    return { token, createdAt: newAddress.createdAt, ...address };
  }

  async update(idAddress: string): Promise<any> {
    await this.addressRepo.update({ id: idAddress }, { updatedAt: new Date() });
    const {
      updatedAt,
      createdAt,
      id,
      userId,
      ...address
    } = await this.addressRepo.findOne({
      id: idAddress,
    });

    return { ...address, updatedAt };
  }

  async createOrUpdate(
    address: AddressRequestDto,
    { authorization }: { authorization: string },
  ): Promise<AddressResponseDto[]> {
    const isValid = await this.cepService.validade(address);
    if (!isValid) {
      throw new HttpException('inconsistent address', HttpStatus.BAD_REQUEST);
    }
    const token = authorization.split(' ')[1];
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.addressRepo.findOne({
      userId: data.id,
      ...address,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, address, token);
      const array = await this.addressRepo.find({
        userId: data.id,
      });
      return array.map(({ id, userId, ...rest }) => rest);
    }
  }
}
