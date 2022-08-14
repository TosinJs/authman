import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & mongoose.Document
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: false })
  emailVerified: boolean

  @Prop()
  avatar: string;

  comparePassword: (password: string) => Promise<Boolean>
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.comparePassword = async function(userPassword: string): Promise<Boolean> {
  const user = this
  return bcrypt.compare(userPassword, user.password)
}
