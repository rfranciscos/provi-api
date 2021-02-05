import { BirthdateController } from '@controllers';
import { BirthdateEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirthdateService } from '@services';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([BirthdateEntity]),
  ],
  controllers: [BirthdateController],
  providers: [BirthdateService],
})
export class BirthdateModule {}
