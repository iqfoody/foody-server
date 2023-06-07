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
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Model } from 'mongoose';
import { AwsService } from 'src/aws/aws.service';
import { TagsDocument } from 'src/models/tags.schema';
import { StateInput } from 'src/constants/state.input';
import { UpdatePositionInput } from 'src/constants/position.input';
export declare class TagsService {
    private TagsModel;
    private readonly awsService;
    constructor(TagsModel: Model<TagsDocument>, awsService: AwsService);
    findTags(): Promise<(import("mongoose").Document<unknown, {}, TagsDocument> & Omit<import("src/models/tags.schema").Tags & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findTag(id: string): Promise<import("mongoose").Document<unknown, {}, TagsDocument> & Omit<import("src/models/tags.schema").Tags & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    create(createTagInput: CreateTagInput, file: any): Promise<import("mongoose").Document<unknown, {}, TagsDocument> & Omit<import("src/models/tags.schema").Tags & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, TagsDocument> & Omit<import("src/models/tags.schema").Tags & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, TagsDocument> & Omit<import("src/models/tags.schema").Tags & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, updateTagInput: UpdateTagInput): Promise<string>;
    state(stateInput: StateInput): Promise<string>;
    position(updatePositionInput: UpdatePositionInput[]): Promise<string>;
    remove(id: string): Promise<string>;
}
