import { UserDto } from '@/dtos/user.dto';
import { FindAllUsersUseCase, FindUserUseCase } from '@/use-cases';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findAllUserUseCase: FindAllUsersUseCase,
  ) {}

  @Query(() => UserDto, { nullable: true })
  async user(@Args('userId') userId: string): Promise<UserDto> {
    return await this.findUserUseCase.perform(userId);
  }

  @Query(() => [UserDto], { nullable: true })
  async allUsers(): Promise<UserDto[]> {
    return await this.findAllUserUseCase.perform();
  }
}
