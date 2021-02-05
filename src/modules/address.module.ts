import { AddressController } from '@controllers';
import { AddressEntity } from '@entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService, AuthService } from '@services';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { CepService } from 'src/services/CEP.service';
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
    TypeOrmModule.forFeature([AddressEntity]),
    CepService,
  ],
  controllers: [AddressController],
  providers: [AddressService, AuthService, JwtStrategy, CepService],
  exports: [PassportModule, JwtModule],
})
export class AddressModule {}
