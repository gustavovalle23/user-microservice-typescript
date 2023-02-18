import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'user:4000',
    package: 'user',
    protoPath: '/app/src/user.proto',
  },
};
