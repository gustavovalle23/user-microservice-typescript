import {
  FindAllUsersResponse,
  CreateUserInput,
  CreateUserResponse,
  FindUserByIdResponse,
  User,
} from '@/domain/dtos/';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserUseCase,
} from '@/domain/use-cases';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findAllUserUseCase: FindAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Query(() => FindUserByIdResponse, { nullable: false })
  async findUserById(
    @Args('id', { nullable: false })
    id: string,
  ): Promise<FindUserByIdResponse> {
    return await this.findUserUseCase.perform({ userId: id });
  }

  @Query(() => FindAllUsersResponse, { nullable: true })
  async allUsers(): Promise<FindAllUsersResponse> {
    const { users } = await this.findAllUserUseCase.perform();
    return {
      users,
    };
  }

  @Mutation(() => CreateUserResponse, { nullable: true })
  async createUser(
    @Args('user') user: CreateUserInput,
  ): Promise<CreateUserResponse> {
    return await this.createUserUseCase.perform(user);
  }
}
