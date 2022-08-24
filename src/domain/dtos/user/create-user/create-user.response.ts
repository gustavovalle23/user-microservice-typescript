import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@/domain/dtos';

@ObjectType()
export class CreateUserResponse {
  @Field(() => User, { nullable: false })
  user: User;
}
