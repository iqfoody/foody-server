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
import { RestaurantsService } from './restaurants.service';
import { AwsService } from 'src/aws/aws.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
export declare class RestaurantsController {
    private readonly restaurantsService;
    private readonly awsService;
    constructor(restaurantsService: RestaurantsService, awsService: AwsService);
    getRestaurants(): Promise<Omit<import("mongoose").Document<unknown, {}, import("../models/restaurants.schema").RestaurantsDocument> & Omit<import("../models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    getRestaurantsInfinty(limit: number, page: number): Promise<{
        data: Omit<import("mongoose").Document<unknown, {}, import("../models/restaurants.schema").RestaurantsDocument> & Omit<import("../models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
        pages: number;
    }>;
    getRestaurantsForCategory(category: string, orderby: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/restaurants.schema").RestaurantsDocument> & Omit<import("../models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getRestaurant(restaurant: string): Promise<import("mongoose").Document<unknown, {}, import("../models/restaurants.schema").RestaurantsDocument> & Omit<import("../models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createRestaurant(createRestaurantInput: CreateRestaurantInput, file: any): Promise<import("mongoose").Document<unknown, {}, import("../models/restaurants.schema").RestaurantsDocument> & Omit<import("../models/restaurants.schema").Restaurants & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateRestaurant(updateRestaurantInput: UpdateRestaurantInput, file: any): Promise<string>;
}
