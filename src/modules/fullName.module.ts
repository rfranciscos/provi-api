import { FullNameController } from '@controllers';
import { FullNameEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FullNameService } from '@services';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forFeature([FullNameEntity])],
  controllers: [FullNameController],
  providers: [FullNameService],
})
export class FullNameModule {}
