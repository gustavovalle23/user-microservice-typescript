import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { User, UserService } from './user';

@Controller()
export class AppController implements OnModuleInit {
  private userService: UserService;

  constructor(
    @Inject('USER_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get()
  getHello(): Observable<User> {
    return this.userService.FindOne({ id: '123' });
  }
}
