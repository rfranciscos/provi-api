import { FullNameRequestDto, FullNameResponseDto } from '@dto';
import { FullNameEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FullNameRepository } from '@repositories';

@Injectable()
export class FullNameService {
  constructor(
    @InjectRepository(FullNameEntity)
    private readonly fullNameRepository: FullNameRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    userId: string,
    firstName: string,
    lastName: string,
  ): Promise<FullNameResponseDto> {
    const data = this.fullNameRepository.create({
      userId,
      firstName,
      lastName,
    });
    await this.fullNameRepository.save(data);

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: data.createdAt,
    };
  }

  async update(idFullName: string): Promise<any> {
    await this.fullNameRepository.update(
      { id: idFullName },
      { updatedAt: new Date() },
    );
    const {
      firstName,
      lastName,
      updatedAt,
    } = await this.fullNameRepository.findOne({
      id: idFullName,
    });

    return { firstName, lastName, updatedAt };
  }

  async createOrUpdate(
    { fullName }: FullNameRequestDto,
    { authorization }: { authorization: string },
  ): Promise<FullNameResponseDto[]> {
    const token = authorization.split(' ')[1];
    const firstOccurence = fullName.indexOf(' ');
    const firstName = fullName.substring(0, firstOccurence);
    const lastName = fullName.substring(firstOccurence + 1);
    const data = await this.jwtService.verifyAsync(token);
    const response = await this.fullNameRepository.findOne({
      userId: data.id,
      firstName,
      lastName,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, firstName, lastName);
      const array = await this.fullNameRepository.find({
        userId: data.id,
      });
      return array.map(({ firstName, lastName, createdAt, updatedAt }) => {
        return {
          firstName,
          lastName,
          createdAt,
          updatedAt,
        };
      });
    }
  }
}
