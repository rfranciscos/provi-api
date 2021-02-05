import { BirthdateController } from '@controllers';
import { BirthdateEntity } from '@entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, BirthdateService } from '@services';
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
    TypeOrmModule.forFeature([BirthdateEntity]),
  ],
  controllers: [BirthdateController],
  providers: [BirthdateService, AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class BirthdateModule {}
