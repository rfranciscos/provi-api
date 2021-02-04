import { AppController } from '@controllers';
import { DynamicModule, Module } from '@nestjs/common';
import { AppService } from '@services';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [TypeOrmModule.forRoot(connOptions)],
      providers: [AppService],
    };
  }
}
