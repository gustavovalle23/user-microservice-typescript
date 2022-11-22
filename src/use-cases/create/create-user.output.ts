import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user.dto';

@ObjectType()
export class CreateUserOutput {
  @Field(() => User, { nullable: false })
  user: User;

  @Field()
  accessToken: string;
}
