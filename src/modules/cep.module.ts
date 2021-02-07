import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CepService } from '@services';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CepService, ConfigService],
  exports: [CepService],
})
export class CepModule {}
