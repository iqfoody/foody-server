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
import { CreateMealInput } from './dto/create-meal.input';
import { UpdateMealInput } from './dto/update-meal.input';
import { Model } from 'mongoose';
import { MealsDocument } from 'src/models/meals.schema';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { LimitEntity } from 'src/constants/limitEntity';
export declare class MealsService {
    private MealsModel;
    private readonly awsService;
    constructor(MealsModel: Model<MealsDocument>, awsService: AwsService);
    create(createMealInput: CreateMealInput, file: any): Promise<import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findForRestaurant(restaurant: string): Promise<(import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findMealsInfinty(limitEntity: LimitEntity): Promise<{
        data: (import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    findForTag(tag: string): Promise<(import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findForRestaurantCategory(restaurantCategories: string): Promise<(import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findMeal(id: string): Promise<import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateMealInput: UpdateMealInput): Promise<string>;
    state(stateInput: StateInput): Promise<string>;
    position(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    remove(id: string): Promise<string>;
    findExtention(_id: string): Promise<import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    search(query: string): Promise<(import("mongoose").Document<unknown, {}, MealsDocument> & Omit<import("src/models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
}