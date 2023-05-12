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
import { IUsersModel } from 'src/models/users.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PasswordUserInput } from './dto/password-user.input';
import { SearchUsersInput } from './dto/search-users.input';
import { userTypes } from 'src/constants/types.type';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdateUserInfo } from './dto/update-info.input';
import { FavoritesService } from 'src/favorites/favorites.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { LimitEntity } from 'src/constants/limitEntity';
import { UpdatePasswordUser } from './dto/update-password-user.input';
export declare class UsersService {
    private UsersModel;
    private readonly awsService;
    private readonly favoritesService;
    private readonly walletsService;
    constructor(UsersModel: IUsersModel, awsService: AwsService, favoritesService: FavoritesService, walletsService: WalletsService);
    search(searchUsersInput: SearchUsersInput): Promise<{
        data: (import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    findAllUsers(limitEntity: LimitEntity): Promise<{
        data: (import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createUser(createUserInput: CreateUserInput): Promise<Omit<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    updateUser(id: string, updateUserInput: UpdateUserInput): Promise<string>;
    passwordUser(id: string, updatePasswordUser: UpdatePasswordUser): Promise<string>;
    state(stateInput: StateInput): Promise<string>;
    remove(id: string): Promise<string>;
    login(loginUserInput: any): Promise<import("src/models/users.schema").UsersDocument>;
    create(createUserInput: CreateUserInput): Promise<Omit<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    findByType(_id: string, type: userTypes): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findWallet(id: string): import("mongoose").QueryWithHelpers<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument>;
    info(id: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateUserInfo: UpdateUserInfo): Promise<string>;
    password(id: string, passwordUserInput: PasswordUserInput): Promise<string>;
    logout(id: string): Promise<void>;
    refresh(id: string, token: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    delete(id: string): Promise<string>;
    getCreatedAt(_id: string): Promise<Partial<User>>;
    findByPhoneNumber(phoneNumber: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAny(id: string, updateUserInput: UpdateUserInput): Promise<{
        message: string;
    }>;
}
