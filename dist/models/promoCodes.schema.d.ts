import mongoose, { Document } from 'mongoose';
import { promoCodeTypes, publicStatus } from 'src/constants/types.type';
import { Users } from './users.schema';
export type PromoCodesDocument = PromoCodes & Document;
export declare class PromoCodes {
    name: string;
    users: string[] | Users[];
    user: string | Users;
    type: promoCodeTypes;
    discount: number;
    public: boolean;
    expire: Date;
    state: publicStatus;
}
export declare const PromoCodesSchema: mongoose.Schema<PromoCodes, mongoose.Model<PromoCodes, any, any, any, mongoose.Document<unknown, any, PromoCodes> & Omit<PromoCodes & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PromoCodes, mongoose.Document<unknown, {}, mongoose.FlatRecord<PromoCodes>> & Omit<mongoose.FlatRecord<PromoCodes> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
