import { AddressController } from '@controllers';
import { AddressEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from '@services';
import { AuthModule } from './auth.module';
import { CepModule } from './CEP.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CepModule,
    TypeOrmModule.forFeature([AddressEntity]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
