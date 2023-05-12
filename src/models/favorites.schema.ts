import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Users } from './users.schema';
import { Restaurants } from './restaurants.schema';
import { Meals } from './meals.schema';

export type FavoritesDocument = Favorites & Document;

@Schema()
export class Favorites {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Users", required: [true, "user required"]})
  user: string | Users;

  @Prop({type: [mongoose.Schema.Types.ObjectId], ref: "Restaurants", default: []})
  restaurants: string[] | Restaurants[];

  @Prop({type: [mongoose.Schema.Types.ObjectId], ref: "Meals", default: []})
  meals: string[] | Meals[];

}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);