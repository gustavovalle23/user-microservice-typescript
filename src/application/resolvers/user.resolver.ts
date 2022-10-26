import {
  CreateUserInput,
  CreateUserResponse,
  FindUserByIdResponse,
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

  @Query(() => FindUserByIdResponse, { nullable: false })
  async findUserById(
    @Args('id', { nullable: false })
    id: string,
  ): Promise<FindUserByIdResponse> {
    return this.findUserUseCase.perform({ userId: id });
  }

  @Query(() => [User], { nullable: false })
  async allUsers(): Promise<User[]> {
    const { users } = await this.findAllUserUseCase.perform();
    return users;
  }

  @Mutation(() => CreateUserResponse, { nullable: false })
  async createUser(
    @Args('user') user: CreateUserInput,
  ): Promise<CreateUserResponse> {
    return this.createUserUseCase.perform(user);
  }

  //   @Mutation(() => LoginResponse, { nullable: false })
  //   async login(@Args('user') user: LoginInput): Promise<LoginResponse> {
  //     return user;
  //   }
}
