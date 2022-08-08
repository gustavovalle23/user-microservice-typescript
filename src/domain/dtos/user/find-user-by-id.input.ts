import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserByIdInput {
  @Field({ nullable: false })
  userId: string;
}
