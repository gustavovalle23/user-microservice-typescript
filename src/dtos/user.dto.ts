import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field()
  name: string;
  @Field({ defaultValue: true, nullable: true })
  status?: boolean;
  @Field()
  documentNo: string;
  @Field()
  birthDate: Date;
}
