import { PhoneNumberController } from '@controllers';
import { PhoneNumberEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberService } from '@services';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([PhoneNumberEntity]),
  ],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService],
})
export class PhoneNumberModule {}
