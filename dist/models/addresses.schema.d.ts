import mongoose, { Document } from 'mongoose';
import { province } from 'src/constants/types.type';
import { Users } from './users.schema';
export type AddressesDocument = Addresses & Document;
export declare class Addresses {
    user: string | Users;
    title: string;
    country: string;
    city: province;
    address: string;
    building: string;
    apartment: string;
    phoneNumber: string;
    description: string;
    latitude: number;
    longitude: number;
}
export declare const AddressesSchema: mongoose.Schema<Addresses, mongoose.Model<Addresses, any, any, any, mongoose.Document<unknown, any, Addresses> & Omit<Addresses & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Addresses, mongoose.Document<unknown, {}, mongoose.FlatRecord<Addresses>> & Omit<mongoose.FlatRecord<Addresses> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
