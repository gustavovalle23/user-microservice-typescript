import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String)
  name: string;
  @Prop()
  @Field(() => String)
  email: string;
  @Prop()
  @Field(() => String)
  role: string;
  @Prop()
  @Field(() => Boolean)
  isActive: boolean;
  @Prop()
  @Field(() => String)
  documentNo: string;
  @Prop()
  @Field(() => String)
  password: string;
  @Prop()
  @Field(() => Date)
  birthDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
