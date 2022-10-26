import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@/application/dtos';

@ObjectType()
export class FindUserByIdResponse {
  @Field(() => User, { nullable: false })
  user: User;
}
