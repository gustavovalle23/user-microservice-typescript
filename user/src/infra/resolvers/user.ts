import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  name: string;
}

@ObjectType()
export class CreateUserOutput {
  @Field()
  user: User;

  @Field()
  accessToken: string;
}
