import {
  JwtPayload,
  JwtToken,
  User,
  UserCredentialsDto,
  UserResponse,
} from '@dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userRequest: UserCredentialsDto): Promise<JwtToken> {
    const user = await this.usersService.create(userRequest);
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
}
