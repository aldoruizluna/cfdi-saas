import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO: Add configuration service to get port
  await app.listen(3000); 
}
bootstrap(); 