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
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Model } from 'mongoose';
import { CategoriesDocument } from 'src/models/categories.schema';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
export declare class CategoriesService {
    private CategoriesModel;
    private readonly awsService;
    constructor(CategoriesModel: Model<CategoriesDocument>, awsService: AwsService);
    findCategories(): Promise<(import("mongoose").Document<unknown, {}, CategoriesDocument> & Omit<import("src/models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findCategory(id: string): Promise<import("mongoose").Document<unknown, {}, CategoriesDocument> & Omit<import("src/models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    create(createCategoryInput: CreateCategoryInput): Promise<BadRequestException | (import("mongoose").Document<unknown, {}, CategoriesDocument> & Omit<import("src/models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, CategoriesDocument> & Omit<import("src/models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, CategoriesDocument> & Omit<import("src/models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateCategoryInput: UpdateCategoryInput): Promise<any>;
    state(stateInput: StateInput): Promise<string>;
    position(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    remove(id: string): Promise<string>;
}
