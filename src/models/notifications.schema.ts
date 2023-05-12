import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { notificationsStatus, notificationsTypes } from 'src/constants/types.type';
import { Users } from './users.schema';

export type NotificationsDocument = Notifications & Document;

@Schema({timestamps: true})
export class Notifications {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
  sender: string | Users;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
  receiver: string | Users;

  @Prop({type: mongoose.Schema.Types.ObjectId})
  targetId: string;

  @Prop({default: "Public"})
  type: notificationsTypes;

  @Prop()
  target: string;

  @Prop({required: true})
  titleEN: string;

  @Prop({required: true})
  titleAR: string;

  @Prop({required: true})
  bodyEN: string;

  @Prop({required: true})
  bodyAR: string;

  @Prop()
  submit: string;

  @Prop()
  dismiss: string;

  @Prop()
  priority: string;

  @Prop({required: true})
  action: string;

  @Prop()
  image: string;

  @Prop({default: "Unread"})
  state: notificationsStatus;

}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);