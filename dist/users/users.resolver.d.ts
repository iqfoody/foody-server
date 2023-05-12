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
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PasswordUserInput } from './dto/password-user.input';
import { SearchUsersInput } from './dto/search-users.input';
import { StateInput } from 'src/constants/state.input';
import { LimitEntity } from 'src/constants/limitEntity';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    cresteUser(createUserInput: CreateUserInput): Promise<Omit<import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    usersSearch(searchUsersInput: SearchUsersInput): Promise<{
        data: (import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: (import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateUser(updateUserInput: UpdateUserInput): Promise<string>;
    passwordUser(passwordUserInput: PasswordUserInput): Promise<string>;
    stateUser(stateInput: StateInput): Promise<string>;
    removeUser(id: string): Promise<string>;
}
