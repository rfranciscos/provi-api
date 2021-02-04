import { UserEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@repositories';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async create(input: any): Promise<any> {
    const { password, email } = input;
    const userInDb = await this.userRepository.findOne({ where: { email } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.userRepository.create({
      password,
      email,
    });

    await this.userRepository.save(user);
    return user;
  }
}
