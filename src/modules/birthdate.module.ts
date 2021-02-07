import { BirthdateController } from '@controllers';
import { BirthdateEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirthdateService } from '@services';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([BirthdateEntity, UserEntity]),
  ],
  controllers: [BirthdateController],
  providers: [BirthdateService],
})
export class BirthdateModule {}
