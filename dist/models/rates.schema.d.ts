import mongoose, { Document } from 'mongoose';
import { Users } from './users.schema';
import { Restaurants } from './restaurants.schema';
import { Drivers } from './drivers.schema';
export type RatesDocument = Rates & Document;
export declare class Rates {
    user: string | Users;
    restaurant: string | Restaurants;
    driver: string | Drivers;
    rate: number;
    description: string;
}
export declare const RatesSchema: mongoose.Schema<Rates, mongoose.Model<Rates, any, any, any, mongoose.Document<unknown, any, Rates> & Omit<Rates & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Rates, mongoose.Document<unknown, {}, mongoose.FlatRecord<Rates>> & Omit<mongoose.FlatRecord<Rates> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
