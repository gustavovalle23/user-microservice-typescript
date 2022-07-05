import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@/infra/schemas';
import { FindUserUseCase } from '@/use-cases';
import { UserResolver } from '@/resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserResolver, FindUserUseCase],
})
export class UsersModule {}
