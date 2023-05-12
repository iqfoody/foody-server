import mongoose, { Document, Model, Query } from 'mongoose';
import { province, publicStatus } from 'src/constants/types.type';
import { LoginInput } from 'src/auth/dto/login.input';
export type DriversDocument = Drivers & Document;
export declare class Drivers {
    name: string;
    phoneNumber: string;
    password: string;
    country: string;
    city: province;
    image: string;
    state: publicStatus;
    ip: string;
    platform: string;
    deviceToken: string;
    refreshToken: string;
    comparePassword: (password: string) => Promise<boolean>;
    compareToken: (refreshToken: string) => Promise<boolean>;
}
export declare const DriversSchema: mongoose.Schema<Drivers, mongoose.Model<Drivers, any, any, any, mongoose.Document<unknown, any, Drivers> & Omit<Drivers & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Drivers, mongoose.Document<unknown, {}, mongoose.FlatRecord<Drivers>> & Omit<mongoose.FlatRecord<Drivers> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export type DriversModelQuery = Query<any, DriversDocument, IDriversQueryHelpers> & IDriversQueryHelpers;
export interface IDriversQueryHelpers {
    drivers: (this: DriversModelQuery, query: string) => DriversModelQuery;
}
export interface IDriversModel extends Model<DriversDocument, IDriversQueryHelpers> {
    login: (loginUserInput: LoginInput) => Promise<DriversDocument | undefined>;
}
