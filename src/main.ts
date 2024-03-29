import * as dotenv from 'dotenv';
dotenv.config({ path: './env/.env' });
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { databaseConfig } from '@config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule.forRoot(databaseConfig));
  const config = new DocumentBuilder()
    .setTitle('Provi API')
    .setDescription('The provi API')
    .setVersion('1.0')
    .addTag('provi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
