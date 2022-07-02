import { UserDto } from '@/dtos/user.dto';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserDto)
export class UserResolver {
  @Query(() => UserDto, { nullable: false })
  async user(@Args('id') id: string): Promise<UserDto> {
    const user = new UserDto();
    user.id = id;
    user.username = 'username';
    user.birthDate = '19/10/1991';
    user.documentNo = '44444444444';
    user.firstName = 'first';
    user.lastName = 'last';
    return user;
  }
}
