import mongoose, { Document } from 'mongoose';
import { notificationsStatus, notificationsTypes } from 'src/constants/types.type';
import { Users } from './users.schema';
import { Orders } from './orders.schema';
import { Restaurants } from './restaurants.schema';
import { Meals } from './meals.schema';
import { Drivers } from './drivers.schema';
export type NotificationsDocument = Notifications & Document;
export declare class Notifications {
    user: string | Users;
    driver: string | Drivers;
    order: string | Orders;
    restaurant: string | Restaurants;
    meal: string | Meals;
    type: notificationsTypes;
    title: string;
    titleEN: string;
    titleKR: string;
    body: string;
    bodyEN: string;
    bodyKR: string;
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
