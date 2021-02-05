import { PhoneNumberController } from '@controllers';
import { PhoneNumberEntity } from '@entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, PhoneNumberService } from '@services';
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
    TypeOrmModule.forFeature([PhoneNumberEntity]),
  ],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService, AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class PhoneNumberModule {}
