import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Users } from './users.schema';
import { Restaurants } from './restaurants.schema';
import { Drivers } from './drivers.schema';

export type RatesDocument = Rates & Document;

@Schema()
export class Rates {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: [true, "User required"]})
  user: string | Users;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants'})
  restaurant: string | Restaurants;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Drivers'})
  driver: string | Drivers;

  @Prop({type: Number, minlength: [0, "0-5 rating rang"], maxlength: [5, "0-5 rating rang"]})
  rate: number;

  @Prop()
  description: string;
}

export const RatesSchema = SchemaFactory.createForClass(Rates);