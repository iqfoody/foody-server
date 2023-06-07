/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { IAdminsModel } from 'src/models/admins.schema';
import { AwsService } from 'src/aws/aws.service';
import { LoginInput } from 'src/auth/dto/login.input';
import { StateInput } from 'src/constants/state.input';
import { UpdatePasswordUser } from 'src/users/dto/update-password-user.input';
import { WalletsService } from 'src/wallets/wallets.service';
export declare class AdminsService {
    private AdminsModel;
    private walletsService;
    private readonly awsService;
    constructor(AdminsModel: IAdminsModel, walletsService: WalletsService, awsService: AwsService);
    login(loginInput: LoginInput): Promise<import("src/models/admins.schema").AdminsDocument>;
    create(_id: string, createAdminInput: CreateAdminInput, file: any): Promise<import("mongoose").Document<unknown, import("src/models/admins.schema").IAdminsQueryHelpers, import("src/models/admins.schema").AdminsDocument> & Omit<import("src/models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): Promise<Omit<import("mongoose").Document<unknown, import("src/models/admins.schema").IAdminsQueryHelpers, import("src/models/admins.schema").AdminsDocument> & Omit<import("src/models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    findOne(_id: string): Promise<import("mongoose").Document<unknown, import("src/models/admins.schema").IAdminsQueryHelpers, import("src/models/admins.schema").AdminsDocument> & Omit<import("src/models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findInfo(_id: string): Promise<import("mongoose").Document<unknown, import("src/models/admins.schema").IAdminsQueryHelpers, import("src/models/admins.schema").AdminsDocument> & Omit<import("src/models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, import("src/models/admins.schema").IAdminsQueryHelpers, import("src/models/admins.schema").AdminsDocument> & Omit<import("src/models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAny(_id: string, updateAdminInput: UpdateAdminInput): Promise<void>;
    updateAdmin(_id: string, updateAdminInput: UpdateAdminInput): Promise<void>;
    update(id: string, updateAdminInput: UpdateAdminInput): Promise<string>;
    passwordAdmin(id: string, updatePasswordAdmin: UpdatePasswordUser): Promise<string>;
    state(stateInput: StateInput): Promise<string>;
    logout(_id: string): Promise<void>;
    refresh(id: string, token: string): Promise<import("mongoose").Document<unknown, import("src/models/admins.schema").IAdminsQueryHelpers, import("src/models/admins.schema").AdminsDocument> & Omit<import("src/models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    remove(_id: string): Promise<string>;
}
