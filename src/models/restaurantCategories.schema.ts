import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Restaurants } from './restaurants.schema';

export type RestaurantCategoriesDocument = RestaurantCategories & Document;

@Schema()
export class RestaurantCategories {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Restaurants", required: [true, "restaurant requird"]})
  restaurant: string | Restaurants;

  @Prop({required: [true, "title required"]})
  title: string;

  @Prop({required: [true, "titleEN required"]})
  titleEN: string;

  @Prop()
  titleKR: string;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  position: number;
}

export const RestaurantCategoriesSchema = SchemaFactory.createForClass(RestaurantCategories);