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
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { WalletsDocument } from 'src/models/wallets.schema';
import { Model } from 'mongoose';
export declare class WalletsService {
    private WalletsModel;
    constructor(WalletsModel: Model<WalletsDocument>);
    create(createWalletInput?: CreateWalletInput): Promise<import("mongoose").Document<unknown, {}, WalletsDocument> & Omit<import("src/models/wallets.schema").Wallets & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, WalletsDocument> & Omit<import("src/models/wallets.schema").Wallets & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, WalletsDocument> & Omit<import("src/models/wallets.schema").Wallets & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, WalletsDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, WalletsDocument> & Omit<import("src/models/wallets.schema").Wallets & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, WalletsDocument> & Omit<import("src/models/wallets.schema").Wallets & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, WalletsDocument>;
    update(id: string, updateWalletInput: UpdateWalletInput): Promise<string>;
    remove(id: string): Promise<string>;
}
