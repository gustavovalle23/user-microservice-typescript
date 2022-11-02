import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@/application/dtos';

@ObjectType()
export class CreateUserResponse {
  @Field(() => User, { nullable: false })
  user: User;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
