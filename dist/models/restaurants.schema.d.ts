import mongoose, { Document } from 'mongoose';
import { publicStatus } from 'src/constants/types.type';
export type RestaurantsDocument = Restaurants & Document;
export declare class Restaurants {
    title: string;
    titleEN: string;
    titleKR: string;
    description: string;
    descriptionEN: string;
    descriptionKR: string;
    image: string;
    rating: number;
    rates: number;
    time: number;
    deliveryPrice: number;
    position: number;
    state: publicStatus;
}
export declare const RestaurantsSchema: mongoose.Schema<Restaurants, mongoose.Model<Restaurants, any, any, any, mongoose.Document<unknown, any, Restaurants> & Omit<Restaurants & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Restaurants, mongoose.Document<unknown, {}, mongoose.FlatRecord<Restaurants>> & Omit<mongoose.FlatRecord<Restaurants> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
