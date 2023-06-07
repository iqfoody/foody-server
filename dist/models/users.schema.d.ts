import mongoose, { Document, Model, Query } from 'mongoose';
import { province, userStatus, userTypes } from 'src/constants/types.type';
import { LoginInput } from 'src/auth/dto/login.input';
import { Wallets } from './wallets.schema';
export type UsersDocument = Users & Document;
export declare class Users {
    wallet: string | Wallets;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    type: userTypes;
    country: string;
    city: province;
    approvedEmail: boolean;
    approvedPhoneNumber: boolean;
    image: string;
    state: userStatus;
    ip: string;
    platform: string;
    deviceToken: string;
    refreshToken: string;
    comparePassword: (password: string) => Promise<boolean>;
    compareToken: (refreshToken: string) => Promise<boolean>;
}
export declare const UsersSchema: mongoose.Schema<Users, mongoose.Model<Users, any, any, any, mongoose.Document<unknown, any, Users> & Omit<Users & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Users, mongoose.Document<unknown, {}, mongoose.FlatRecord<Users>> & Omit<mongoose.FlatRecord<Users> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export type UsersModelQuery = Query<any, UsersDocument, IUsersQueryHelpers> & IUsersQueryHelpers;
export interface IUsersQueryHelpers {
    users: (this: UsersModelQuery, query: string) => UsersModelQuery;
}
export interface IUsersModel extends Model<UsersDocument, IUsersQueryHelpers> {
    login: (loginUserInput: LoginInput) => Promise<UsersDocument | undefined>;
}
