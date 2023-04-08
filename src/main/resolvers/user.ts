import { Field, InputType, ObjectType } from '@nestjs/graphql';

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

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  isActive: boolean;

  @Field()
  password: string;

  @Field()
  cpf: string;

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
