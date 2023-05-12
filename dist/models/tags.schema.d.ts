import mongoose, { Document } from 'mongoose';
import { publicStatus } from 'src/constants/types.type';
export type TagsDocument = Tags & Document;
export declare class Tags {
    title: string;
    titleEN: string;
    titleKR: string;
    image: string;
    position: number;
    state: publicStatus;
}
export declare const TagsSchema: mongoose.Schema<Tags, mongoose.Model<Tags, any, any, any, mongoose.Document<unknown, any, Tags> & Omit<Tags & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Tags, mongoose.Document<unknown, {}, mongoose.FlatRecord<Tags>> & Omit<mongoose.FlatRecord<Tags> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
