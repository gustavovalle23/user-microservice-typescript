import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User, UserService } from './user';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from './client';

@Controller()
export class AppController implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client1: ClientGrpc;

  private userService: UserService;

  onModuleInit() {
    this.userService = this.client1.getService<UserService>('UserService');
  }

  @Get()
  getHello(): Observable<User> {
    return this.userService.FindOne({ id: '123' });
  }
}
