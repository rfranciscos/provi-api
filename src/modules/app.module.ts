import { AppController } from '@controllers';
import { DynamicModule, Module } from '@nestjs/common';
import { AppService } from '@services';
import { ConnectionOptions, getMetadataArgsStorage } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules';
import { AuthModule } from './auth.module';

@Module({})
export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [
        AuthModule,
        UserModule,
        TypeOrmModule.forRoot({
          ...connOptions,
          entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        }),
      ],
      providers: [AppService],
    };
  }
}
