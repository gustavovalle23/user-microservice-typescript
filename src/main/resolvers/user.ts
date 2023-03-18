import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  role?: string;

  @Field()
  isActive: boolean;

  @Field()
  cpf: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  birthDate: Date;
}

@ObjectType()
export class CreateUserOutput {
  @Field()
  user: User;

  @Field()
  accessToken: string;
}
