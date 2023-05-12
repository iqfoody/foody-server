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
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';
import { Model } from 'mongoose';
import { PromoCodesDocument } from 'src/models/promoCodes.schema';
export declare class PromoCodesService {
    private PromoCodesModel;
    constructor(PromoCodesModel: Model<PromoCodesDocument>);
    create(createPromoCodeInput: CreatePromoCodeInput): Promise<import("mongoose").Document<unknown, {}, PromoCodesDocument> & Omit<import("src/models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, PromoCodesDocument> & Omit<import("src/models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, PromoCodesDocument> & Omit<import("src/models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, PromoCodesDocument>;
    findPromoCodes(user: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, PromoCodesDocument> & Omit<import("src/models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, PromoCodesDocument> & Omit<import("src/models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, PromoCodesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, PromoCodesDocument> & Omit<import("src/models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, PromoCodesDocument> & Omit<import("src/models/promoCodes.schema").PromoCodes & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, PromoCodesDocument>;
    check(name: string, user: string): Promise<NotFoundException | {
        _id: any;
        name: string;
        discount: number;
        type: import("../constants/types.type").promoCodeTypes;
    }>;
    usePromoCode(name: string, user: string): Promise<NotFoundException | NotAcceptableException | "Verifyed">;
    update(id: string, updatePromoCodeInput: UpdatePromoCodeInput): Promise<string>;
    remove(id: string): Promise<string>;
}
