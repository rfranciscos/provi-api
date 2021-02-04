import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { databaseConfig } from '@config';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule.forRoot(databaseConfig));
  app.use(helmet());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
