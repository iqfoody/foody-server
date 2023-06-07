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
import { AdvertisementsService } from './advertisements.service';
import { UpdateAdvertisementInput } from './dto/update-advertisement.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { StateInput } from 'src/constants/state.input';
export declare class AdvertisementsResolver {
    private readonly advertisementsService;
    constructor(advertisementsService: AdvertisementsService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../models/advertisements.schema").AdvertisementsDocument> & Omit<import("../models/advertisements.schema").Advertisements & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<any>;
    updateAdvertisement(updateAdvertisementInput: UpdateAdvertisementInput): Promise<string>;
    positionAdvertisement(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    stateAdvertisement(stateInput: StateInput): Promise<string>;
    removeAdvertisement(id: string): Promise<string>;
}
