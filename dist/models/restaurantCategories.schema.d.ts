import mongoose, { Document } from 'mongoose';
import { Restaurants } from './restaurants.schema';
export type RestaurantCategoriesDocument = RestaurantCategories & Document;
export declare class RestaurantCategories {
    restaurant: string | Restaurants;
    title: string;
    titleEN: string;
    titleKR: string;
    position: number;
}
export declare const RestaurantCategoriesSchema: mongoose.Schema<RestaurantCategories, mongoose.Model<RestaurantCategories, any, any, any, mongoose.Document<unknown, any, RestaurantCategories> & Omit<RestaurantCategories & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RestaurantCategories, mongoose.Document<unknown, {}, mongoose.FlatRecord<RestaurantCategories>> & Omit<mongoose.FlatRecord<RestaurantCategories> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
