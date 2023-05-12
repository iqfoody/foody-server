import mongoose, { Document } from 'mongoose';
export type WalletsDocument = Wallets & Document;
export declare class Wallets {
    points: number;
    amount: number;
}
export declare const WalletsSchema: mongoose.Schema<Wallets, mongoose.Model<Wallets, any, any, any, mongoose.Document<unknown, any, Wallets> & Omit<Wallets & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Wallets, mongoose.Document<unknown, {}, mongoose.FlatRecord<Wallets>> & Omit<mongoose.FlatRecord<Wallets> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
