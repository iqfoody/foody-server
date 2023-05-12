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
import { CreateRateInput } from './dto/create-rate.input';
import { UpdateRateInput } from './dto/update-rate.input';
import { Model } from 'mongoose';
import { RatesDocument } from 'src/models/rates.schema';
export declare class RatesService {
    private RatesModel;
    constructor(RatesModel: Model<RatesDocument>);
    create(createRateInput: CreateRateInput): Promise<import("mongoose").Document<unknown, {}, RatesDocument> & Omit<import("src/models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    rateDriver(createRateInput: CreateRateInput): Promise<string>;
    rateResaurant(createRateInput: CreateRateInput): Promise<{
        rating: any;
        rates: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, RatesDocument> & Omit<import("src/models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, RatesDocument> & Omit<import("src/models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, RatesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, RatesDocument> & Omit<import("src/models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, RatesDocument> & Omit<import("src/models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, RatesDocument>;
    update(id: string, updateRateInput: UpdateRateInput): Promise<string>;
    remove(id: string): Promise<string>;
}
