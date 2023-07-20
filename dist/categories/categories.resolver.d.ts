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
import { CategoriesService } from './categories.service';
import { UpdateCategoryInput } from './dto/update-category.input';
import { BadRequestException } from '@nestjs/common';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { CreateCategoryInput } from './dto/create-category.input';
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(createCategoryInput: CreateCategoryInput): Promise<BadRequestException | (import("mongoose").Document<unknown, {}, import("../models/categories.schema").CategoriesDocument> & Omit<import("../models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../models/categories.schema").CategoriesDocument> & Omit<import("../models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/categories.schema").CategoriesDocument> & Omit<import("../models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): Promise<any>;
    positionCategory(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    stateCategory(stateInput: StateInput): Promise<string>;
    removeCategory(id: string): Promise<string>;
}
