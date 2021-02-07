import { FullNameController } from '@controllers';
import { FullNameEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FullNameService } from '@services';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([FullNameEntity, UserEntity]),
  ],
  controllers: [FullNameController],
  providers: [FullNameService],
})
export class FullNameModule {}
