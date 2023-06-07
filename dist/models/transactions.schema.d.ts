import mongoose, { Document } from 'mongoose';
import { paymentMethodsType, procedureTypes, transactionTypes } from 'src/constants/types.type';
export type TransactionsDocument = Transactions & Document;
export declare class Transactions {
    user: string;
    admin: string;
    driver: string;
    order: string;
    description: string;
    type: transactionTypes;
    procedure: procedureTypes;
    amount: number;
    previous: number;
    paymentMethod: paymentMethodsType;
    state: string;
}
export declare const TransactionsSchema: mongoose.Schema<Transactions, mongoose.Model<Transactions, any, any, any, mongoose.Document<unknown, any, Transactions> & Omit<Transactions & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Transactions, mongoose.Document<unknown, {}, mongoose.FlatRecord<Transactions>> & Omit<mongoose.FlatRecord<Transactions> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
