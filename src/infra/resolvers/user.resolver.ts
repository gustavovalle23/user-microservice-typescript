import { CreateUserUseCase } from '@/use-cases/create';
import { CreateUserInput } from '@/use-cases/create/create-user.input';
import { CreateUserOutput } from '@/use-cases/create/create-user.output';
import { FindUserUseCase } from '@/use-cases/find';
import { FindAllUsersUseCase } from '@/use-cases/list';
import { User } from '@/use-cases/user.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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
    const { users } = await this.findAllUserUseCase.execute();
    return users;
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
