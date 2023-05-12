import mongoose, { Document } from 'mongoose';
import { advertisementsTypes, publicStatus } from 'src/constants/types.type';
import { Users } from './users.schema';
export type AdvertisementsDocument = Advertisements & Document;
export declare class Advertisements {
    user: string | Users;
    title: string;
    titleEN: string;
    titleKR: string;
    image: string;
    type: advertisementsTypes;
    target: string;
    position: number;
    state: publicStatus;
}
export declare const AdvertisementsSchema: mongoose.Schema<Advertisements, mongoose.Model<Advertisements, any, any, any, mongoose.Document<unknown, any, Advertisements> & Omit<Advertisements & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Advertisements, mongoose.Document<unknown, {}, mongoose.FlatRecord<Advertisements>> & Omit<mongoose.FlatRecord<Advertisements> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
