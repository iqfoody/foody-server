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
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';
import { DriversService } from 'src/drivers/drivers.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    private readonly driversService;
    constructor(authService: AuthService, usersService: UsersService, driversService: DriversService);
    login(loginInput: LoginInput, req: any): Promise<any>;
    signup(createUserInput: CreateUserInput, req: any): Promise<Omit<import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    info(req: any): Promise<import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    loginDriver(loginInput: LoginInput, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    infoDriver(req: any): Promise<import("mongoose").Document<unknown, import("../models/drivers.schema").IDriversQueryHelpers, import("../models/drivers.schema").DriversDocument> & Omit<import("../models/drivers.schema").Drivers & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
