import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindUserByIdArgs {
  @Field({ nullable: false })
  userId: string;
}
