import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@ObjectType()
export class FindUserByIdResponse {
  @Field(() => UserDto, { nullable: false })
  user: UserDto;
}
