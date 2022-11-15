import {
  CreateUserInput,
  CreateUserResponse,
  LoginInput,
  LoginResponse,
  User,
} from '@/application/dtos';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserUseCase,
} from '@/application/use-cases';
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
    const { user } = await this.findUserUseCase.execute({ userId: id });
    return { ...user };
  }

  @Query(() => [User], { nullable: false })
  async allUsers(): Promise<User[]> {
    const { users } = await this.findAllUserUseCase.execute();
    return users;
  }

  @Mutation(() => CreateUserResponse, { nullable: false })
  async createUser(
    @Args('user') input: CreateUserInput,
  ): Promise<CreateUserResponse> {
    const { user, accessToken, refreshToken } =
      await this.createUserUseCase.execute(input);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => LoginResponse, { nullable: false })
  async login(@Args('user') {}: LoginInput): Promise<LoginResponse> {
    return;
  }
}
