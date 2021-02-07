import { FullNameRequestDto, FullNameResponseDto } from '@dto';
import { FullNameEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FullNameRepository, UserRepository } from '@repositories';

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
    userId: string,
    firstName: string,
    lastName: string,
  ): Promise<FullNameResponseDto> {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    const data = this.fullNameRepository.create({
      user,
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

  async createOrUpdate({
    fullName,
    token,
  }: FullNameRequestDto): Promise<FullNameResponseDto[]> {
    const firstOccurence = fullName.indexOf(' ');
    const firstName = fullName.substring(0, firstOccurence);
    const lastName = fullName.substring(firstOccurence + 1);
    const data = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOneOrFail({ id: data.id });
    const response = await this.fullNameRepository.findOne({
      user,
      firstName,
      lastName,
    });

    if (response) {
      return await this.update(response.id);
    } else {
      await this.create(data.id, firstName, lastName);
      const array = await this.fullNameRepository.find({ user });
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
