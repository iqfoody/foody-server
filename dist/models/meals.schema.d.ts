import mongoose, { Document } from 'mongoose';
import { mealStatus } from 'src/constants/types.type';
import { Restaurants } from './restaurants.schema';
import { Tags } from './tags.schema';
import { RestaurantCategories } from './restaurantCategories.schema';
import { Categories } from './categories.schema';
export type MealsDocument = Meals & Document;
export declare class MealIngredients {
    title: string;
    titleEN: string;
    titleKR: string;
}
export declare const MealIngredientsSchema: mongoose.Schema<MealIngredients, mongoose.Model<MealIngredients, any, any, any, mongoose.Document<unknown, any, MealIngredients> & Omit<MealIngredients & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MealIngredients, mongoose.Document<unknown, {}, mongoose.FlatRecord<MealIngredients>> & Omit<mongoose.FlatRecord<MealIngredients> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export declare class MealAdditions {
    title: string;
    titleEN: string;
    titleKR: string;
    price: number;
}
export declare const MealAdditionsSchema: mongoose.Schema<MealAdditions, mongoose.Model<MealAdditions, any, any, any, mongoose.Document<unknown, any, MealAdditions> & Omit<MealAdditions & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MealAdditions, mongoose.Document<unknown, {}, mongoose.FlatRecord<MealAdditions>> & Omit<mongoose.FlatRecord<MealAdditions> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export declare class Meals {
    category: string | Categories;
    restaurant: string | Restaurants;
    tag: string | Tags;
    restaurantCategory: string | RestaurantCategories;
    title: string;
    titleEN: string;
    titleKR: string;
    description: string;
    descriptionEN: string;
    descriptionKR: string;
    image: string;
    additions: MealAdditions[];
    ingredients: MealIngredients[];
    price: number;
    previousPrice: number;
    points: number;
    pointsBack: number;
    position: number;
    state: mealStatus;
    discount: number;
}
export declare const MealsSchema: mongoose.Schema<Meals, mongoose.Model<Meals, any, any, any, mongoose.Document<unknown, any, Meals> & Omit<Meals & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Meals, mongoose.Document<unknown, {}, mongoose.FlatRecord<Meals>> & Omit<mongoose.FlatRecord<Meals> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
