import { HttpResponse, JwtToken, UserRequestDto } from '@dto';
import { Controller, Body, Post, Request } from '@nestjs/common';
import { AuthService } from '@services';
import { getRouterList } from 'src/helpers';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(
    @Body() userRequest: UserRequestDto,
    @Request() req,
  ): Promise<HttpResponse<JwtToken>> {
    const paths = getRouterList(req);
    const token = await this.authService.createUser(userRequest, paths);

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
