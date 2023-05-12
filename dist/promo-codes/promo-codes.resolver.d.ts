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
import { PromoCodesService } from './promo-codes.service';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';
export declare class PromoCodesResolver {
    private readonly promoCodesService;
    constructor(promoCodesService: PromoCodesService);
    createPromoCode(createPromoCodeInput: CreatePromoCodeInput): Promise<import("mongoose").Document<unknown, {}, import("../models/promoCodes.schema").PromoCodesDocument> & Omit<import("../models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/promoCodes.schema").PromoCodesDocument> & Omit<import("../models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, import("../models/promoCodes.schema").PromoCodesDocument> & Omit<import("../models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/promoCodes.schema").PromoCodesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/promoCodes.schema").PromoCodesDocument> & Omit<import("../models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, import("../models/promoCodes.schema").PromoCodesDocument> & Omit<import("../models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/promoCodes.schema").PromoCodesDocument>;
    updatePromoCode(updatePromoCodeInput: UpdatePromoCodeInput): Promise<string>;
    removePromoCode(id: string): Promise<string>;
}
