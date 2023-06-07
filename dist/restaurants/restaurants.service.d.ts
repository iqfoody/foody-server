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
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Model } from 'mongoose';
import { RestaurantsDocument } from 'src/models/restaurants.schema';
import { AwsService } from 'src/aws/aws.service';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
import { LimitEntity } from 'src/constants/limitEntity';
import { RestaurantCategoriesService } from 'src/restaurant-categories/restaurant-categories.service';
import { MealsService } from 'src/meals/meals.service';
export declare class RestaurantsService {
    private RestaurantsModel;
    private mealsService;
    private restaurantCategoriesService;
    private readonly awsService;
    constructor(RestaurantsModel: Model<RestaurantsDocument>, mealsService: MealsService, restaurantCategoriesService: RestaurantCategoriesService, awsService: AwsService);
    findRestaurnats(): Promise<(import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findRestaurnatsInfinty(limitEntity: LimitEntity): Promise<{
        data: (import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    findRestaurant(id: string): Promise<any>;
    searchRestaurant(query: string): Promise<(import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    create(createRestaurantInput: CreateRestaurantInput, file: any): Promise<import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateRestaurantInput: UpdateRestaurantInput): Promise<string>;
    state(stateInput: StateInput): Promise<string>;
    position(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    remove(id: string): Promise<string>;
    search(query: string): Promise<(import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getDeliveryPrice(_id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, RestaurantsDocument>;
    findRating(_id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, RestaurantsDocument> & Omit<import("src/models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, RestaurantsDocument>;
    home(): Promise<number>;
}
