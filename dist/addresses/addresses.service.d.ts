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
/// <reference types="mongoose/types/inferschematype" />
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Model } from 'mongoose';
import { AddressesDocument } from 'src/models/addresses.schema';
import { UsersService } from 'src/users/users.service';
export declare class AddressesService {
    private AddressesModel;
    private usersService;
    constructor(AddressesModel: Model<AddressesDocument>, usersService: UsersService);
    create(createAddressInput: CreateAddressInput): Promise<import("mongoose").Document<unknown, {}, AddressesDocument> & Omit<import("src/models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(user: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, AddressesDocument> & Omit<import("src/models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, AddressesDocument> & Omit<import("src/models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, AddressesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, AddressesDocument> & Omit<import("src/models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, AddressesDocument> & Omit<import("src/models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, AddressesDocument>;
    update(id: string, updateAddressInput: UpdateAddressInput): Promise<string>;
    remove(id: string): Promise<string>;
    findAddresses(phoneNumber: string): Promise<(import("mongoose").Document<unknown, {}, AddressesDocument> & Omit<import("src/models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findAddress(id: string, phoneNumber: string): Promise<import("mongoose").Document<unknown, {}, AddressesDocument> & Omit<import("src/models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAddress(updateAddressInput: UpdateAddressInput, phoneNumber: string): Promise<string>;
    removeAddress(id: string, phoneNumber: string): Promise<string>;
    clean(phoneNumber: string): Promise<string>;
}
