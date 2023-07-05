import mongoose, { Document, Model, Query } from 'mongoose';
import { adminTypes, publicStatus } from 'src/constants/types.type';
import { LoginInput } from 'src/auth/dto/login.input';
import { Wallets } from './wallets.schema';
export declare class Permissions {
    object: string;
    abilities: string[];
}
export type AdminsDocument = Admins & Document;
export declare class Admins {
    wallet: string | Wallets;
    name: string;
    email: string;
    password: string;
    type: adminTypes;
    image: string;
    state: publicStatus;
    ip: string;
    platform: string;
    deviceToken: string;
    refreshToken: string;
    permissions: Permissions[];
    comparePassword: (password: string) => Promise<boolean>;
    compareToken: (refreshToken: string) => Promise<boolean>;
}
export declare const AdminsSchema: mongoose.Schema<Admins, mongoose.Model<Admins, any, any, any, mongoose.Document<unknown, any, Admins> & Omit<Admins & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Admins, mongoose.Document<unknown, {}, mongoose.FlatRecord<Admins>> & Omit<mongoose.FlatRecord<Admins> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export type AdminsModelQuery = Query<any, AdminsDocument, IAdminsQueryHelpers> & IAdminsQueryHelpers;
export interface IAdminsQueryHelpers {
    admins: (this: AdminsModelQuery, query: string) => AdminsModelQuery;
}
export interface IAdminsModel extends Model<AdminsDocument, IAdminsQueryHelpers> {
    login: (loginInput: LoginInput) => Promise<AdminsDocument | undefined>;
}
