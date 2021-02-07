import { AmountRequestedController } from '@controllers';
import { AmountRequestedEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmountRequestedService } from '@services';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([AmountRequestedEntity, UserEntity]),
  ],
  controllers: [AmountRequestedController],
  providers: [AmountRequestedService],
})
export class AmountRequestedModule {}
