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
import { userTypes } from 'src/constants/types.type';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdateUserInfo } from './dto/update-info.input';
import { FavoritesService } from 'src/favorites/favorites.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { LimitEntity } from 'src/constants/limitEntity';
import { UpdatePasswordUser } from './dto/update-password-user.input';
import { SearchInput } from 'src/constants/searchQuery.input';
import { AddressesService } from 'src/addresses/addresses.service';
export declare class UsersService {
    private UsersModel;
    private readonly awsService;
    private readonly favoritesService;
    private readonly walletsService;
    private readonly addressesService;
    constructor(UsersModel: IUsersModel, awsService: AwsService, favoritesService: FavoritesService, walletsService: WalletsService, addressesService: AddressesService);
    search(searchUsersInput: SearchInput): Promise<{
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
    createUser(createUserInput: CreateUserInput, file: any): Promise<{
        _id: any;
        name: any;
        phoneNumber: any;
        image: any;
        type: any;
        state: any;
        createdAt: any;
        email: any;
    }>;
    updateUser(id: string, updateUserInput: UpdateUserInput): Promise<string>;
    passwordUser(id: string, updatePasswordUser: UpdatePasswordUser): Promise<string>;
    state(stateInput: StateInput): Promise<string>;
    remove(id: string): Promise<string>;
    findDeviceToken(_id: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
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
    info(phoneNumber: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateUserInfo: UpdateUserInfo): Promise<string>;
    password(id: string, passwordUserInput: PasswordUserInput): Promise<string>;
    logout(phoneNumber: string): Promise<void>;
    delete(id: string): Promise<string>;
    getCreatedAt(_id: string): Promise<Partial<User>>;
    findByPhoneNumber(phoneNumber: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAny(phoneNumber: string, updateUserInput: UpdateUserInput): Promise<{
        message: string;
    }>;
    findId(phoneNumber: string): Promise<import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    home(): Promise<{
        users: number;
        recentlyUsers: (import("mongoose").Document<unknown, import("src/models/users.schema").IUsersQueryHelpers, import("src/models/users.schema").UsersDocument> & Omit<import("src/models/users.schema").Users & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    usersReport(date: string): Promise<{
        m0: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m1: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
        };
        m2: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m3: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m4: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m5: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m6: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m7: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m8: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m9: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m10: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m11: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
    }>;
}
