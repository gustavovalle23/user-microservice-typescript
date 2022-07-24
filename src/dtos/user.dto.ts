import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsISO8601 } from 'class-validator';

@ObjectType('User')
export class UserDto {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ defaultValue: true, nullable: true })
  isActive?: boolean;

  @Field()
  documentNo: string;

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
  documentNo: string;

  @Field()
  @IsISO8601({ strict: true, strictSeparator: true })
  birthDate: Date;
}

@ObjectType()
export class CreateUserResponse {
  @Field(() => UserDto, { nullable: false })
  user: UserDto;
}
