import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.dto';

@ObjectType()
export class FindUserByIdResponse {
  @Field(() => User, { nullable: false })
  user: User;
}
