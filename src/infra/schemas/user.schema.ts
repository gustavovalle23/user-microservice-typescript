import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;
  @Prop()
  username: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  documentNo: string;
  @Prop()
  birthDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
