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
import { AdminsService } from './admins.service';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { StateInput } from 'src/constants/state.input';
import { UpdatePasswordUser } from 'src/users/dto/update-password-user.input';
export declare class AdminsResolver {
    private readonly adminsService;
    constructor(adminsService: AdminsService);
    createAdmin(createAdminInput: CreateAdminInput, context: any): Promise<import("mongoose").Document<unknown, import("../models/admins.schema").IAdminsQueryHelpers, import("../models/admins.schema").AdminsDocument> & Omit<import("../models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): Promise<Omit<import("mongoose").Document<unknown, import("../models/admins.schema").IAdminsQueryHelpers, import("../models/admins.schema").AdminsDocument> & Omit<import("../models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, import("../models/admins.schema").IAdminsQueryHelpers, import("../models/admins.schema").AdminsDocument> & Omit<import("../models/admins.schema").Admins & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAdmin(updateAdminInput: UpdateAdminInput): Promise<any>;
    passwordUser(passwordAdminInput: UpdatePasswordUser): Promise<string>;
    stateAdmin(stateInput: StateInput): Promise<string>;
    removeAdmin(id: string): Promise<string>;
}
