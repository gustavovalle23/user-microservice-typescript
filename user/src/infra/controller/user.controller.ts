import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from '../resolvers/user';
import { UserById } from './user.dto';

@Controller()
export class UserController {
  @GrpcMethod('UserService', 'FindOne')
  findOne(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): User {
    return {
      name: 'Gus With Id: ' + data.id,
      cpf: '44444444',
      birthDate: new Date('25/02/1992'),
      email: 'email@gmail.com',
      isActive: true,
      password: '123',
      role: 'admin',
    };
  }
}
