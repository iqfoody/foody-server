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
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    getAddress(id: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("../models/addresses.schema").AddressesDocument> & Omit<import("../models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getAddresses(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/addresses.schema").AddressesDocument> & Omit<import("../models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    createAddress(createAddressInput: CreateAddressInput, req: any): Promise<import("mongoose").Document<unknown, {}, import("../models/addresses.schema").AddressesDocument> & Omit<import("../models/addresses.schema").Addresses & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAddress(id: string, updateAddressInput: UpdateAddressInput, req: any): Promise<string>;
    deleteAddress(id: string, req: any): Promise<string>;
}
