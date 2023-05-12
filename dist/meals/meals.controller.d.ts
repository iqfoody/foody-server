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
import { MealsService } from './meals.service';
import { AwsService } from 'src/aws/aws.service';
import { UpdateMealInput } from './dto/update-meal.input';
import { CreateMealInput } from './dto/create-meal.input';
export declare class MealsController {
    private readonly mealsService;
    private readonly awsService;
    constructor(mealsService: MealsService, awsService: AwsService);
    getMealsInfinty(limit: number, page: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    getRestaurants(restaurant: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getTags(tag: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getrestaurantCategory(restaurantCategory: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getMeal(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createMeal(createMealInput: CreateMealInput, file: any): Promise<import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateMeal(updateMealInput: UpdateMealInput, file: any): Promise<string>;
}
