import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@ObjectType()
export class FindAllUsersResponse {
  @Field(() => [UserDto], { nullable: false })
  users: UserDto[];
}
