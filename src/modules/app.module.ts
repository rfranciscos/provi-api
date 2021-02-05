import { DynamicModule, Module } from '@nestjs/common';
import { AppService } from '@services';
import { ConnectionOptions, getMetadataArgsStorage } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules';
import { AuthModule } from './auth.module';
import { CpfModule } from './cpf.module';
import { FullNameModule } from './fullName.module';
import { BirthdateModule } from './birthdate.module';
import { PhoneNumberModule } from './PhoneNumber.module';
import { CepModule } from './CEP.module';
import { AddressModule } from './address.module';

@Module({})
export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        AuthModule,
        UserModule,
        CpfModule,
        FullNameModule,
        BirthdateModule,
        PhoneNumberModule,
        AddressModule,
        CepModule,
        TypeOrmModule.forRoot({
          ...connOptions,
          entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        }),
      ],
      providers: [AppService],
    };
  }
}
