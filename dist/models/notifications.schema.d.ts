import mongoose, { Document } from 'mongoose';
import { notificationsStatus, notificationsTypes } from 'src/constants/types.type';
import { Users } from './users.schema';
export type NotificationsDocument = Notifications & Document;
export declare class Notifications {
    sender: string | Users;
    receiver: string | Users;
    targetId: string;
    type: notificationsTypes;
    target: string;
    titleEN: string;
    titleAR: string;
    bodyEN: string;
    bodyAR: string;
    submit: string;
    dismiss: string;
    priority: string;
    action: string;
    image: string;
    state: notificationsStatus;
}
export declare const NotificationsSchema: mongoose.Schema<Notifications, mongoose.Model<Notifications, any, any, any, mongoose.Document<unknown, any, Notifications> & Omit<Notifications & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Notifications, mongoose.Document<unknown, {}, mongoose.FlatRecord<Notifications>> & Omit<mongoose.FlatRecord<Notifications> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
