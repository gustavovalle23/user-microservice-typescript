import {
  FindAllUsersResponse,
  CreateUserInput,
  CreateUserResponse,
  FindUserByIdInput,
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
    @Args({ nullable: false }) { userId }: FindUserByIdInput,
  ): Promise<FindUserByIdResponse> {
    return this.findUserUseCase.perform({ userId });
  }

  @Query(() => FindAllUsersResponse, { nullable: true })
  async allUsers(): Promise<FindAllUsersResponse> {
    return await this.findAllUserUseCase.perform();
  }

  @Mutation(() => CreateUserResponse, { nullable: true })
  async createUser(
    @Args('user') user: CreateUserInput,
  ): Promise<CreateUserResponse> {
    return await this.createUserUseCase.perform(user);
  }
}
