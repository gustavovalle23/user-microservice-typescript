import { Module } from '@nestjs/common';
import { User } from '@/infra/entities';
import { FindAllUsersUseCase, FindUserUseCase } from '@/use-cases';
import { UserResolver } from '@/resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infra/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserResolver,
    FindUserUseCase,
    FindAllUsersUseCase,
    UserRepository,
  ],
})
export class UsersModule {}
