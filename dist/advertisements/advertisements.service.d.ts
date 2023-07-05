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
import { BadRequestException } from '@nestjs/common';
import { CreateAdvertisementInput } from './dto/create-advertisement.input';
import { UpdateAdvertisementInput } from './dto/update-advertisement.input';
import { Model } from 'mongoose';
import { AdvertisementsDocument } from 'src/models/advertisements.schema';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { AwsService } from 'src/aws/aws.service';
export declare class AdvertisementsService {
    private AdvertisementsModel;
    private readonly awsService;
    constructor(AdvertisementsModel: Model<AdvertisementsDocument>, awsService: AwsService);
    findAdvertisements(): Promise<(import("mongoose").Document<unknown, {}, AdvertisementsDocument> & Omit<import("src/models/advertisements.schema").Advertisements & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findAdvertisement(id: string): Promise<import("mongoose").Document<unknown, {}, AdvertisementsDocument> & Omit<import("src/models/advertisements.schema").Advertisements & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    create(createAdvertisementInput: CreateAdvertisementInput): Promise<BadRequestException | (import("mongoose").Document<unknown, {}, AdvertisementsDocument> & Omit<import("src/models/advertisements.schema").Advertisements & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, AdvertisementsDocument> & Omit<import("src/models/advertisements.schema").Advertisements & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateAdvertisementInput: UpdateAdvertisementInput): Promise<string>;
    state(stateInput: StateInput): Promise<string>;
    position(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    remove(id: string): Promise<string>;
}
