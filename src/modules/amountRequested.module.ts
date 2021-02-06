import { AmountRequestedController } from '@controllers';
import { AmountRequestedEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmountRequestedService } from '@services';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([AmountRequestedEntity]),
  ],
  controllers: [AmountRequestedController],
  providers: [AmountRequestedService],
})
export class AmountRequestedModule {}
