import mongoose, { Document } from 'mongoose';
import { Users } from './users.schema';
export type FeedbacksDocument = Feedbacks & Document;
export declare class Feedbacks {
    subject: string;
    message: string;
    name: string;
    phoneNumber: string;
    user: string | Users;
}
export declare const FeedbacksSchema: mongoose.Schema<Feedbacks, mongoose.Model<Feedbacks, any, any, any, mongoose.Document<unknown, any, Feedbacks> & Omit<Feedbacks & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Feedbacks, mongoose.Document<unknown, {}, mongoose.FlatRecord<Feedbacks>> & Omit<mongoose.FlatRecord<Feedbacks> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
