import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { BigintInterceptor } from './common/interceptors/bigint.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalInterceptors(new BigintInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
