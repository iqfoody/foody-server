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
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { Model } from 'mongoose';
import { FeedbacksDocument } from 'src/models/feedbacks.schema';
export declare class FeedbacksService {
    private FeedbacksModel;
    constructor(FeedbacksModel: Model<FeedbacksDocument>);
    create(createFeedbackInput: CreateFeedbackInput): Promise<import("mongoose").Document<unknown, {}, FeedbacksDocument> & Omit<import("src/models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, FeedbacksDocument> & Omit<import("src/models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, FeedbacksDocument> & Omit<import("src/models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, FeedbacksDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, FeedbacksDocument> & Omit<import("src/models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, FeedbacksDocument> & Omit<import("src/models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, FeedbacksDocument>;
    remove(id: string): Promise<string>;
}
