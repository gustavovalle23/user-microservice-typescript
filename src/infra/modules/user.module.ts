import { Module } from '@nestjs/common';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserUseCase,
} from '@/application/use-cases';
import { UserResolver } from '@/application/resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/infra/models';
import { UserRepository } from '@/infra/repositories';
import { JwtGateway } from '@/infra/gateways';
import { USER_REPOSITORY } from '@/domain/contracts/repo';
import { JWT_SERVICE } from '@/domain/contracts/gateways';

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
    UserResolver,
    FindUserUseCase.UseCase,
    FindAllUsersUseCase.UseCase,
    CreateUserUseCase.UseCase,

    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: JWT_SERVICE,
      useClass: JwtGateway,
    },
  ],
})
export class UsersModule {}
