import { Query, Resolver } from '@nestjs/graphql';
import { UserDto } from 'src/dtos/user.dto';

@Resolver(() => UserDto)
export class UserResolver {
  @Query(() => UserDto, { nullable: false })
  async me(): Promise<UserDto> {
    return new UserDto();
  }
}
