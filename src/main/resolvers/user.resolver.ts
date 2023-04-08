import { CreateUserUseCase } from '@/use-cases/create';
import { CreateUserInput } from '@/use-cases/create/create-user.input';
import { FindUserUseCase } from '@/use-cases/find';
import { FindAllUsersUseCase } from '@/use-cases/list';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserOutput, User } from './user';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly findUserUseCase: FindUserUseCase.UseCase,
    private readonly findAllUserUseCase: FindAllUsersUseCase.UseCase,
    private readonly createUserUseCase: CreateUserUseCase.UseCase,
  ) {}

  @Query(() => User, { nullable: false })
  async findUserById(
    @Args('id', { nullable: false })
    id: string,
  ): Promise<User> {
    const user = await this.findUserUseCase.execute({ userId: id });
    return { ...user };
  }

  @Query(() => [User], { nullable: false })
  async allUsers(): Promise<User[]> {
    return this.findAllUserUseCase.execute({ limit: 10, offset: 0 });
  }

  @Mutation(() => CreateUserOutput, { nullable: false })
  async createUser(
    @Args('user') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    const { user, accessToken } = await this.createUserUseCase.execute(input);

    return {
      user,
      accessToken,
    };
  }
}
