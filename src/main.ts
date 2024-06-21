import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './main/modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      protoPath: '/app/src/infra/proto/user.proto',
      package: 'user',
    },
  });

  await app.listen(4000);
}

bootstrap();
