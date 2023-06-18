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
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { Model } from 'mongoose';
import { FavoritesDocument } from 'src/models/favorites.schema';
import { UsersService } from 'src/users/users.service';
export declare class FavoritesService {
    private FavoritesModel;
    private usersService;
    constructor(FavoritesModel: Model<FavoritesDocument>, usersService: UsersService);
    create(createFavoriteInput: CreateFavoriteInput): Promise<import("mongoose").Document<unknown, {}, FavoritesDocument> & Omit<import("src/models/favorites.schema").Favorites & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, FavoritesDocument> & Omit<import("src/models/favorites.schema").Favorites & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, FavoritesDocument> & Omit<import("src/models/favorites.schema").Favorites & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, FavoritesDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, FavoritesDocument> & Omit<import("src/models/favorites.schema").Favorites & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, FavoritesDocument> & Omit<import("src/models/favorites.schema").Favorites & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, FavoritesDocument>;
    findFavorite(phoneNumber: string): Promise<import("mongoose").Document<unknown, {}, FavoritesDocument> & Omit<import("src/models/favorites.schema").Favorites & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    addFavorite(updateFavoriteInput: UpdateFavoriteInput, phoneNumber: string): Promise<string>;
    remove(id: string): Promise<string>;
}
