import { AppController } from '@controllers';
import { DynamicModule, Module } from '@nestjs/common';
import { AppService } from '@services';
import { ConnectionOptions, getMetadataArgsStorage } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entities';

@Module({})
export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [
        TypeOrmModule.forRoot({
          ...connOptions,
          entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        }),
        TypeOrmModule.forFeature([UserEntity]),
        UserEntity,
      ],
      providers: [AppService, UserEntity],
    };
  }
}
