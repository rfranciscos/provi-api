/* eslint-disable @typescript-eslint/no-unused-vars */
import { FullNameRequestDto, FullNameResponseDto } from '@dto';
import { FullNameEntity, UserEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FullNameRepository, UserRepository } from '@repositories';
import { validadeFullName } from '@validators';

@Injectable()
export class FullNameService {
  constructor(
    @InjectRepository(FullNameEntity)
    private readonly fullNameRepository: FullNameRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    user: UserEntity,
    firstName: string,
    lastName: string,
  ): Promise<FullNameResponseDto> {
    const data = this.fullNameRepository.create({
      user,
      firstName,
      lastName,
    });
    const { id, user: _, ...rest } = await this.fullNameRepository.save(data);
    return rest;
  }

  async update(idFullName: string): Promise<FullNameResponseDto> {
    await this.fullNameRepository.update(
      { id: idFullName },
      { updatedAt: new Date() },
    );
    const { id, user: _, ...rest } = await this.fullNameRepository.findOne({
      id: idFullName,
    });
    return rest;
  }

  async createOrUpdate({
    fullName,
    token,
  }: FullNameRequestDto): Promise<FullNameResponseDto> {
    if (validadeFullName(fullName)) {
      throw new HttpException(
        'This full name is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const firstOccurence = fullName.indexOf(' ');
    let firstName = '';
    let lastName = '';
    if (firstOccurence === -1) {
      firstName = fullName;
    } else {
      firstName = fullName.substring(0, firstOccurence);
      lastName = fullName.substring(firstOccurence + 1);
    }
    const data = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.fullNameRepository.findOne({
      user,
      firstName,
      lastName,
    });

    if (response) {
      return this.update(response.id);
    } else {
      return this.create(user, firstName, lastName);
    }
  }
}
