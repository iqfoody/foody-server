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
import { RatesService } from './rates.service';
import { CreateRateInput } from './dto/create-rate.input';
import { UpdateRateInput } from './dto/update-rate.input';
export declare class RatesResolver {
    private readonly ratesService;
    constructor(ratesService: RatesService);
    createRate(createRateInput: CreateRateInput): Promise<import("mongoose").Document<unknown, {}, import("../models/rates.schema").RatesDocument> & Omit<import("../models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/rates.schema").RatesDocument> & Omit<import("../models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, import("../models/rates.schema").RatesDocument> & Omit<import("../models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/rates.schema").RatesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/rates.schema").RatesDocument> & Omit<import("../models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, import("../models/rates.schema").RatesDocument> & Omit<import("../models/rates.schema").Rates & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/rates.schema").RatesDocument>;
    updateRate(updateRateInput: UpdateRateInput): Promise<string>;
    removeRate(id: string): Promise<string>;
}
