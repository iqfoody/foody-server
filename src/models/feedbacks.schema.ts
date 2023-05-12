import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Users } from './users.schema';

export type FeedbacksDocument = Feedbacks & Document;

@Schema({timestamps: true})
export class Feedbacks {

  @Prop({required: [true, "title required"]})
  subject: string;

  @Prop({required: [true, "message required"]})
  message: string;

  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
  user: string | Users;
}

export const FeedbacksSchema = SchemaFactory.createForClass(Feedbacks);