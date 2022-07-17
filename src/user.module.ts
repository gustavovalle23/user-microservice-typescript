import { Module } from '@nestjs/common';
import { User } from '@/infra/entities';
import { FindUserUseCase } from '@/use-cases';
import { UserResolver } from '@/resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infra/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, FindUserUseCase, UserRepository],
})
export class UsersModule {}
