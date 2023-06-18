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
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CookieOptions } from 'express';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AdminsService } from 'src/admins/admins.service';
import { DriversService } from 'src/drivers/drivers.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private adminsService;
    private driversService;
    cookieOptions: CookieOptions;
    cookieRefreshOptions: CookieOptions;
    accessOptions: any;
    refreshOptions: any;
    constructor(usersService: UsersService, jwtService: JwtService, adminsService: AdminsService, driversService: DriversService);
    validateUser(phoneNumber: string): Promise<import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    login(context: any, loginInput: LoginInput): Promise<any>;
    loginAdmin(context: any, loginInput: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    loginDriver(context: any, loginInput: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    signup(createUserInput: CreateUserInput, context: any): Promise<Omit<import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    logout(context: any, type: string): Promise<string>;
    findInfoAdmin(context: any): Promise<string | (import("mongoose").Document<unknown, import("../models/admins.schema").IAdminsQueryHelpers, import("../models/admins.schema").AdminsDocument> & Omit<import("../models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)>;
    refresh(context: any, type: string): Promise<string>;
    getTokens(user: any, metadata: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    getNewAccessToken(user: any, metadata: string): Promise<string>;
}
