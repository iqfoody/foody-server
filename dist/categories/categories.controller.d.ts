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
import { AwsService } from 'src/aws/aws.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { MealsService } from 'src/meals/meals.service';
export declare class CategoriesController {
    private readonly categoriesService;
    private readonly mealsService;
    private readonly awsService;
    constructor(categoriesService: CategoriesService, mealsService: MealsService, awsService: AwsService);
    getRestaurantsForCategory(category: string, orderby: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getCategories(): Promise<(import("mongoose").Document<unknown, {}, import("../models/categories.schema").CategoriesDocument> & Omit<import("../models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    createCategory(createCategoryInput: CreateCategoryInput, file: any): Promise<import("@nestjs/common").BadRequestException | (import("mongoose").Document<unknown, {}, import("../models/categories.schema").CategoriesDocument> & Omit<import("../models/categories.schema").Categories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)>;
    updateCategory(updateCategoryInput: UpdateCategoryInput, file: any): Promise<string>;
}
