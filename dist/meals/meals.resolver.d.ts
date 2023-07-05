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
import { CreateMealInput } from './dto/create-meal.input';
import { UpdateMealInput } from './dto/update-meal.input';
import { BadRequestException } from '@nestjs/common';
import { LimitEntity } from 'src/constants/limitEntity';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { CreateMealObject } from './dto/create-meal-object.input';
import { UpdateMealObject } from './dto/update-meal-object.input';
import { RemoveMealObject } from './dto/remove-mea-object.input';
export declare class MealsResolver {
    private readonly mealsService;
    constructor(mealsService: MealsService);
    createMeal(createMealInput: CreateMealInput): Promise<BadRequestException | (import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: Omit<import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
        pages: number;
    }>;
    findAllForRestaurant(limitEntity: LimitEntity): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    search(query: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/meals.schema").MealsDocument> & Omit<import("../models/meals.schema").Meals & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateMeal(updateMealInput: UpdateMealInput): Promise<string>;
    stateMeal(stateInput: StateInput): Promise<string>;
    positionMeal(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    removeMeal(id: string): Promise<string>;
    createMealObject(createMealObject: CreateMealObject): Promise<any>;
    updateMealObject(updateMealObject: UpdateMealObject): Promise<string>;
    removeMealObject(removeMealObject: RemoveMealObject): Promise<string>;
}
