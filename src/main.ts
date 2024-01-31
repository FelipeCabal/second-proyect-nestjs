import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { CORS } from './constants';

// Cargar variables de entorno con dotenv
dotenv.config({ path: `.develop.env` });


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'))

  const configService = app.get(ConfigService)

  app.enableCors(CORS)

  app.setGlobalPrefix('api')
  console.log(process.env.NODE_ENV)
  console.log(configService.get('PORT'))
  await app.listen(configService.get('PORT'));
  console.log(`Aplication running on: ${await app.getUrl()}`)
}
bootstrap();

