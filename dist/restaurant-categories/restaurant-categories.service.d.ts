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
import { CreateRestaurantCategoryInput } from './dto/create-restaurant-category.input';
import { UpdateRestaurantCategoryInput } from './dto/update-restaurant-category.input';
import { Model } from 'mongoose';
import { RestaurantCategoriesDocument } from 'src/models/restaurantCategories.schema';
export declare class RestaurantCategoriesService {
    private RestaurantCategoriesModel;
    constructor(RestaurantCategoriesModel: Model<RestaurantCategoriesDocument>);
    create(createRestaurantCategoryInput: CreateRestaurantCategoryInput): Promise<import("mongoose").Document<unknown, {}, RestaurantCategoriesDocument> & Omit<import("src/models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, RestaurantCategoriesDocument> & Omit<import("src/models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, RestaurantCategoriesDocument> & Omit<import("src/models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, RestaurantCategoriesDocument>;
    findForRestaurant(restaurant: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, RestaurantCategoriesDocument> & Omit<import("src/models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, RestaurantCategoriesDocument> & Omit<import("src/models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, RestaurantCategoriesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, RestaurantCategoriesDocument> & Omit<import("src/models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, RestaurantCategoriesDocument> & Omit<import("src/models/restaurantCategories.schema").RestaurantCategories & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, RestaurantCategoriesDocument>;
    update(id: string, updateRestaurantCategoryInput: UpdateRestaurantCategoryInput): Promise<string>;
    remove(id: string): Promise<string>;
}
