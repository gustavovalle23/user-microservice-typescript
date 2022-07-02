import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  documentNo: string;
  @Field()
  password: string;
  @Field()
  birthDate: string;
}
