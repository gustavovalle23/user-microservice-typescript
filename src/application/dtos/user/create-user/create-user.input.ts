import { Field, InputType } from '@nestjs/graphql';
import { IsISO8601 } from 'class-validator';

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
