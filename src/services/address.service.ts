/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddressRequestDto, AddressResponseDto } from '@dto';
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
    userId: string,
    address: AddressRequestDto,
    token: string,
  ): Promise<AddressResponseDto> {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    const newAddress = this.addressRepo.create({ user, ...address });
    await this.addressRepo.save(newAddress);

    return { token, createdAt: newAddress.createdAt, ...address };
  }

  async update(idAddress: string): Promise<any> {
    await this.addressRepo.update({ id: idAddress }, { updatedAt: new Date() });
    const {
      updatedAt,
      createdAt,
      id,
      user,
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
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.addressRepo.findOne({
      user,
      ...address,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, address, token);
      const array = await this.addressRepo.find({
        user,
      });
      return array.map(({ id, user, ...rest }) => rest);
    }
  }
}
