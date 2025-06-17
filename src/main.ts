// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Adicione a configuração de CORS aqui
  app.enableCors({
    origin: 'http://localhost:8081', // URL do seu frontend
  });

  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`API rodando com sucesso na porta: ${port}`);
}
bootstrap();