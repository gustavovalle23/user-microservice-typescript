import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindUserByIdInput {
  @Field({ nullable: false })
  userId: string;
}
