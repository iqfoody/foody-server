import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { notificationsStatus, notificationsTypes } from 'src/constants/types.type';
import { Users } from './users.schema';
import { Orders } from './orders.schema';
import { Restaurants } from './restaurants.schema';
import { Meals } from './meals.schema';
import { Drivers } from './drivers.schema';

export type NotificationsDocument = Notifications & Document;

@Schema({timestamps: true})
export class Notifications {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
  user: string | Users;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Drivers'})
  driver: string | Drivers;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Orders'})
  order: string | Orders;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Restaruants"})
  restaurant: string | Restaurants;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Meals'})
  meal: string | Meals;

  @Prop({default: "Public"})
  type: notificationsTypes;

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  titleEN: string;

  @Prop()
  titleKR: string;

  @Prop({required: true})
  body: string;

  @Prop({required: true})
  bodyEN: string;

  @Prop()
  bodyKR: string;

  @Prop()
  submit: string;

  @Prop()
  dismiss: string;

  @Prop()
  priority: string;

  @Prop()
  action: string;

  @Prop()
  image: string;

  @Prop({default: "Unread"})
  state: notificationsStatus;

}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);