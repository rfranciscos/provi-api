import {
  JwtPayload,
  JwtToken,
  User,
  UserCredentialsDto,
  UserResponse,
} from '@dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RouterList } from 'src/helpers';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    userRequest: UserCredentialsDto,
    paths: RouterList[],
  ): Promise<JwtToken> {
    const user = await this.usersService.create({ ...userRequest, paths });
    return this.createToken(user);
  }

  async authenticateUser(userRequest: UserCredentialsDto): Promise<JwtToken> {
    const user = await this.usersService.findByCredentials(userRequest);
    return this.createToken(user);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private createToken({ id }: UserResponse): JwtToken {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { id };
    const token = this.jwtService.sign(user);
    return {
      expiresIn,
      token,
    };
  }

  async getUserPath(jwtToken: string, currentPath: string): Promise<void> {
    const data = await this.jwtService.verifyAsync(jwtToken);
    const paths = await this.usersService.getPaths(data.id);
    paths.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    if (paths[0].nextPath !== currentPath) {
      throw new HttpException(
        `Invalid endPoint - ${paths[0].nextPath}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePaths(jwtToken: string, currentPath: string) {
    const data = await this.jwtService.verifyAsync(jwtToken);
    const path = await this.usersService.updatePath(currentPath, data.id);
    return path;
  }
}
