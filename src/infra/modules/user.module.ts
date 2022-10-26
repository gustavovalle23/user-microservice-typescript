import { Module } from '@nestjs/common';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserUseCase,
} from '@/application/use-cases';
import { UserResolver } from '@/application/resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/infra/models';
import { UserRepo } from '@/infra/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    // Resolvers
    UserResolver,

    // Use cases
    FindUserUseCase.UseCase,
    FindAllUsersUseCase.UseCase,
    CreateUserUseCase.UseCase,

    // Repositories
    {
      provide: 'UserRepo',
      useClass: UserRepo,
    },
  ],
})
export class UsersModule {}
