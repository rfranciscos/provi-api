import { FullNameRequestDto, FullNameResponseDto } from '@dto';
import { FullNameEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FullNameService {
  constructor(
    @InjectRepository(FullNameEntity)
    private readonly fullNameRepo: Repository<FullNameEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    userId: string,
    firstName: string,
    lastName: string,
    token: string,
  ): Promise<FullNameResponseDto> {
    const data = this.fullNameRepo.create({ userId, firstName, lastName });
    await this.fullNameRepo.save(data);

    return {
      token,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: data.createdAt,
    };
  }

  async update(idFullName: string): Promise<any> {
    await this.fullNameRepo.update(
      { id: idFullName },
      { updatedAt: new Date() },
    );
    const { firstName, lastName, updatedAt } = await this.fullNameRepo.findOne({
      id: idFullName,
    });

    return { firstName, lastName, updatedAt };
  }

  async createOrUpdate(
    { fullName }: FullNameRequestDto,
    { authorization }: { authorization: string },
  ): Promise<FullNameResponseDto> {
    const token = authorization.split(' ')[1];
    const firstOccurence = fullName.indexOf(' ');
    const firstName = fullName.substring(0, firstOccurence);
    const lastName = fullName.substring(firstOccurence + 1);
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.fullNameRepo.findOne({
      userId: data.id,
      firstName,
      lastName,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      return await this.create(data.id, firstName, lastName, token);
    }
  }
}
