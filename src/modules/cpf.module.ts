import { CpfController } from '@controllers';
import { CPFEntity } from '@entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, CpfService } from '@services';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
    TypeOrmModule.forFeature([CPFEntity]),
  ],
  controllers: [CpfController],
  providers: [CpfService, AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class CpfModule {}
