import { UserEntity, UserPathEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@services';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserPathEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
