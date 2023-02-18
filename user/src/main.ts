import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './infra/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, 'infra/proto/user.proto'),
    },
  });

  await app.listen(4000);
}

bootstrap();
