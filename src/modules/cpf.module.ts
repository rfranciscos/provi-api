import { CpfController } from '@controllers';
import { CPFEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfService } from '@services';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([CPFEntity, UserEntity]),
  ],
  controllers: [CpfController],
  providers: [CpfService],
})
export class CpfModule {}
