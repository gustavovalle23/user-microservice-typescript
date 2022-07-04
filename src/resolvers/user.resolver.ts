import { UserDto } from '@/dtos/user.dto';
import { FindUserUseCase } from '@/use-cases';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly findUserUseCase: FindUserUseCase) {}

  @Query(() => UserDto, { nullable: false })
  async user(@Args('userId') userId: string): Promise<UserDto> {
    return await this.findUserUseCase.perform(userId);
  }
}
