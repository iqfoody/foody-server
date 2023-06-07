import mongoose, { Document } from 'mongoose';
import { publicStatus } from 'src/constants/types.type';
export type CategoriesDocument = Categories & Document;
export declare class Categories {
    title: string;
    titleEN: string;
    titleKR: string;
    image: string;
    position: number;
    state: publicStatus;
}
export declare const CategoriesSchema: mongoose.Schema<Categories, mongoose.Model<Categories, any, any, any, mongoose.Document<unknown, any, Categories> & Omit<Categories & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Categories, mongoose.Document<unknown, {}, mongoose.FlatRecord<Categories>> & Omit<mongoose.FlatRecord<Categories> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
