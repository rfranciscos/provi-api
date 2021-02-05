import { AuthController } from '@controllers';
import { Module } from '@nestjs/common';
import { AuthService } from '@services';
import { jwtStrategyModule } from './jwtStrategy.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, jwtStrategyModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, jwtStrategyModule],
})
export class AuthModule {}
