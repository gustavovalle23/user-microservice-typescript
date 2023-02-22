import { Module } from '@nestjs/common';

import { UserResolver } from '@/infra/resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/infra/models';
import { MongooseUserRepository } from '@/infra/repositories';
import { JwtGateway } from '@/infra/gateways';
import { JWT_SERVICE } from '@/domain/contracts/gateways';
import { FindUserUseCase } from '@/use-cases/find';
import { FindAllUsersUseCase } from '@/use-cases/list';
import { CreateUserUseCase } from '@/use-cases/create';
import { UserRepository } from '@/domain/contracts/repo';
import { UserService } from '../controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserService],
  providers: [
    UserService,
    UserResolver,
    FindUserUseCase.UseCase,
    FindAllUsersUseCase.UseCase,
    CreateUserUseCase.UseCase,

    {
      provide: UserRepository,
      useClass: MongooseUserRepository,
    },
    {
      provide: JWT_SERVICE,
      useClass: JwtGateway,
    },
  ],
})
export class UsersModule {}
