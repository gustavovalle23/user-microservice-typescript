import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType('User')
export class User {
  @Field()
  @IsOptional()
  id?: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field({ defaultValue: true, nullable: true })
  isActive?: boolean;
  @Field()
  documentNo: string;
  @Field()
  birthDate: Date;
}
