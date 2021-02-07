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
    user: UserEntity,
    firstName: string,
    lastName: string,
  ): Promise<FullNameResponseDto> {
    const data = this.fullNameRepository.create({
      user,
      firstName,
      lastName,
    });
    return this.fullNameRepository.save(data);
  }

  async update(idFullName: string): Promise<FullNameResponseDto> {
    await this.fullNameRepository.update(
      { id: idFullName },
      { updatedAt: new Date() },
    );
    return this.fullNameRepository.findOne({
      id: idFullName,
    });
  }

  async createOrUpdate({
    fullName,
    token,
  }: FullNameRequestDto): Promise<FullNameResponseDto> {
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
      await this.create(user, firstName, lastName);
    }
  }
}
