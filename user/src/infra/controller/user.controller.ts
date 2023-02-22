import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserById } from './user.dto';

interface User {
  name: string;
  email: string;
  role?: string;
  isActive: boolean;
  cpf: string;
  password?: string;
  birthDate: Date;
}

@Controller()
export class UserService {
  @GrpcMethod()
  findOne(
    data: UserById,
    metadata: Metadata,
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
