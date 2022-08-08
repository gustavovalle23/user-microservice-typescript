import {
  AllUsersResponse,
  CreateUserInput,
  CreateUserResponse,
  FindUserByIdInput,
  FindUserByIdResponse,
  UserDto,
} from '@/domain/dtos/user.dto';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserUseCase,
} from '@/domain/use-cases';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findAllUserUseCase: FindAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Query(() => FindUserByIdResponse, { nullable: true })
  async findUserById(
    @Args('data') { userId }: FindUserByIdInput,
  ): Promise<FindUserByIdResponse> {
    return await this.findUserUseCase.perform({ userId });
  }

  @Query(() => AllUsersResponse, { nullable: true })
  async allUsers(): Promise<AllUsersResponse> {
    return await this.findAllUserUseCase.perform();
  }

  @Mutation(() => CreateUserResponse, { nullable: true })
  async createUser(
    @Args('user') user: CreateUserInput,
  ): Promise<CreateUserResponse> {
    return await this.createUserUseCase.perform(user);
  }
}
