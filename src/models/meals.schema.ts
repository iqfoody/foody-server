import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mealStatus } from 'src/constants/types.type';
import { Restaurants } from './restaurants.schema';
import { Tags } from './tags.schema';
import { RestaurantCategories } from './restaurantCategories.schema';
import { Categories } from './categories.schema';

export type MealsDocument = Meals & Document;

// this schema for ingredients meal to add extra or remove...
@Schema()
export class MealIngredients {
  @Prop({required: [true, "title required"]})
  title: string;

  @Prop({required: [true, "titleEN required"]})
  titleEN: string;

  @Prop()
  titleKR: string;
}
export const MealIngredientsSchema = SchemaFactory.createForClass(MealIngredients);

// this schema for addition meal with price...
@Schema()
export class MealAdditions {
  @Prop({required: [true, "title required"]})
  title: string;

  @Prop({required: [true, "titleEN required"]})
  titleEN: string;

  @Prop()
  titleKR: string;

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "price required"]})
  price: number;
}
export const MealAdditionsSchema = SchemaFactory.createForClass(MealAdditions);

@Schema({timestamps: true})
export class Meals {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Categories'})
  category: string | Categories;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Restaurants", required: [true, "restaurant requird"]})
  restaurant: string | Restaurants;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Tags'})
  tag: string | Tags;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantCategories', required: [true, "RestaurantCategories required"]})
  restaurantCategory: string | RestaurantCategories;

  @Prop({required: [true, "title required"], index: {name: "text", description: "text", text: true}})
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

  @Prop()
  image: string;

  @Prop({type: [MealAdditionsSchema]})
  additions: MealAdditions[];

  @Prop({type: [MealIngredientsSchema]})
  ingredients: MealIngredients[];

  @Prop({type: mongoose.Schema.Types.Number, required: [true, "price required"], minlength: [250, "Min price 250"]})
  price: number;

  @Prop({type: mongoose.Schema.Types.Number, minlength: [250, "Min price 250"]})
  previousPrice: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0, maxlength: [25, "max points converter to price is FB20"], minlength: [5, "Min price 250"]})
  points: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0, maxlength: [100, "max points back is 100%"]})
  pointsBack: number;

  @Prop({type: mongoose.Schema.Types.Number, default: 0})
  position: number;

  @Prop({default: "Active"})
  state: mealStatus;

  // -> after update 1...

  @Prop({type: mongoose.Schema.Types.Number, default: 0, minlength: [1000, "Min discount 1000"]})
  discount: number;

}

export const MealsSchema = SchemaFactory.createForClass(Meals);