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
import { RestaurantCategoriesService } from './restaurant-categories.service';
import { CreateRestaurantCategoryInput } from './dto/create-restaurant-category.input';
import { UpdateRestaurantCategoryInput } from './dto/update-restaurant-category.input';
import { UpdatePositionInput } from 'src/constants/position.input';
export declare class RestaurantCategoriesResolver {
    private readonly restaurantCategoriesService;
    constructor(restaurantCategoriesService: RestaurantCategoriesService);
    createRestaurantCategory(createRestaurantCategoryInput: CreateRestaurantCategoryInput): Promise<import("mongoose").Document<unknown, {}, import("../models/restaurantCategories.schema").RestaurantCategoriesDocument> & Omit<import("../models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/restaurantCategories.schema").RestaurantCategoriesDocument> & Omit<import("../models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, import("../models/restaurantCategories.schema").RestaurantCategoriesDocument> & Omit<import("../models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/restaurantCategories.schema").RestaurantCategoriesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/restaurantCategories.schema").RestaurantCategoriesDocument> & Omit<import("../models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, import("../models/restaurantCategories.schema").RestaurantCategoriesDocument> & Omit<import("../models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/restaurantCategories.schema").RestaurantCategoriesDocument>;
    updateRestaurantCategory(updateRestaurantCategoryInput: UpdateRestaurantCategoryInput): Promise<string>;
    positionRestaurantCategory(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    removeRestaurantCategory(id: string): Promise<string>;
}
