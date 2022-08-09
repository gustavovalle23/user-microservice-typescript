import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.dto';

@ObjectType()
export class FindAllUsersResponse {
  @Field(() => [User], { nullable: false })
  users: User[];
}
