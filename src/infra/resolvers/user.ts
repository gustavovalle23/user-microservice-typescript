import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  name: string;
}

@ObjectType()
export class CreateUserOutput {
  user: User;
  accessToken: string;
}
