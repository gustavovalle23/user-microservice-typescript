import { CreateUserInput, CreateUserResponse, UserDto } from '@/dtos/user.dto';
import {
  CreateUserUseCase,
  FindAllUsersUseCase,
  FindUserUseCase,
} from '@/use-cases';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findAllUserUseCase: FindAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Query(() => UserDto, { nullable: true })
  async user(@Args('userId') userId: string): Promise<UserDto> {
    return await this.findUserUseCase.perform(userId);
  }

  @Query(() => [UserDto], { nullable: true })
  async allUsers(): Promise<UserDto[]> {
    return await this.findAllUserUseCase.perform();
  }

  @Mutation(() => CreateUserResponse, { nullable: true })
  async createUser(
    @Args('user') user: CreateUserInput,
  ): Promise<CreateUserResponse> {
    return await this.createUserUseCase.perform(user);
  }
}
