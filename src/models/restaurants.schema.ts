import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { publicStatus } from 'src/constants/types.type';

export type RestaurantsDocument = Restaurants & Document;

@Schema({timestamps: true})
export class Restaurants {

  @Prop({type: mongoose.Schema.Types.String ,required: [true, "title required"], index: {name: "text", description: "text", text: true}})
  title: string;

  @Prop({required: [true, "titleEN required"], index: {name: "text", description: "text", text: true}})
  titleEN: string;

  @Prop({index: {name: "text", description: "text", text: true}})
  titleKR: string;

  @Prop({required: [true, "description required"]})
  description: string;

  @Prop({required: [true, "descriptionEN required"]})
  descriptionEN: string;

  @Prop()
  descriptionKR: string;

  @Prop({required: [true, "image required"]})
  image: string;

  @Prop({maxLength: 5, minlength: 0, type: mongoose.Schema.Types.Number, default: 5.0})
  rating: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 1})
  rates: number;

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "Time required"]})
  time: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  deliveryPrice: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  position: number;

  @Prop({default: "Active"})
  state: publicStatus;
}

export const RestaurantsSchema = SchemaFactory.createForClass(Restaurants);