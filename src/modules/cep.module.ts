import { HttpModule, Module } from '@nestjs/common';
import { CepService } from 'src/services/CEP.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CepService, ConfigService],
  exports: [CepService],
})
export class CepModule {}
