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
import { AddressesService } from './addresses.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
export declare class AddressesResolver {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    createAddress(createAddressInput: CreateAddressInput): Promise<import("mongoose").Document<unknown, {}, import("../models/addresses.schema").AddressesDocument> & Omit<import("../models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/addresses.schema").AddressesDocument> & Omit<import("../models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, import("../models/addresses.schema").AddressesDocument> & Omit<import("../models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/addresses.schema").AddressesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/addresses.schema").AddressesDocument> & Omit<import("../models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, import("../models/addresses.schema").AddressesDocument> & Omit<import("../models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/addresses.schema").AddressesDocument>;
    updateAddress(updateAddressInput: UpdateAddressInput): Promise<string>;
    removeAddress(id: string): Promise<string>;
}
