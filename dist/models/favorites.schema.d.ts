import mongoose, { Document } from 'mongoose';
import { Users } from './users.schema';
import { Restaurants } from './restaurants.schema';
import { Meals } from './meals.schema';
export type FavoritesDocument = Favorites & Document;
export declare class Favorites {
    user: string | Users;
    restaurants: string[] | Restaurants[];
    meals: string[] | Meals[];
}
export declare const FavoritesSchema: mongoose.Schema<Favorites, mongoose.Model<Favorites, any, any, any, mongoose.Document<unknown, any, Favorites> & Omit<Favorites & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Favorites, mongoose.Document<unknown, {}, mongoose.FlatRecord<Favorites>> & Omit<mongoose.FlatRecord<Favorites> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
