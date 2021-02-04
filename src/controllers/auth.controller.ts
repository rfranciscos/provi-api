import { HttpResponse, JwtToken, UserRequestDto } from '@dto';
import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '@services';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(
    @Body() userRequest: UserRequestDto,
  ): Promise<HttpResponse<JwtToken>> {
    console.log(userRequest);
    const token = await this.authService.createUser(userRequest);

    return {
      sucess: true,
      message: 'Registered successfully',
      data: token,
    };
  }

  @Post('login')
  public async login(
    @Body() userRequest: UserRequestDto,
  ): Promise<HttpResponse<JwtToken>> {
    const token = await this.authService.authenticateUser(userRequest);
    return {
      sucess: true,
      message: 'Authenticated',
      data: token,
    };
  }
}
