import { Module } from '@nestjs/common';
import { User } from '@/infra/entities';
import { FindUserUseCase } from '@/use-cases';
import { UserResolver } from '@/resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, FindUserUseCase],
})
export class UsersModule {}
