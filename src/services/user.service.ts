import {
  JwtPayload,
  User,
  UserCredentialsDto,
  UserRequestDto,
  UserResponse,
} from '@dto';
import { UserEntity, UserPathEntity } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPathRepository, UserRepository } from '@repositories';
import { validatePassword } from '@validators';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserPathEntity)
    private readonly userPathRepository: UserPathRepository,
  ) {}

  async findByPayload({ id }: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByCredentials({
    email,
    password,
  }: UserCredentialsDto): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await validatePassword(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return { id: user.id, email: user.email };
  }

  async create(input: UserRequestDto, inputPaths: any): Promise<UserResponse> {
    const userInDb = await this.userRepository.findOne({
      where: { email: input.email },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = this.userRepository.create({
      password: input.password,
      email: input.email,
    });
    await this.userRepository.save(user);
    const paths = inputPaths.map((item) =>
      this.userPathRepository.create({ ...item, user }),
    );
    await this.userPathRepository.save(paths);

    return { id: user.id, email: user.email, createdAt: user.createdAt };
  }

  async getPaths(userId: string) {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    return await this.userPathRepository.find({ user });
  }

  async updatePath(path: string, userId: string): Promise<string> {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    const pathh = await this.userPathRepository.findOneOrFail({ user, path });
    await this.userPathRepository.update(
      { id: pathh.id },
      { updatedAt: new Date() },
    );
    return pathh.nextPath;
  }
}
