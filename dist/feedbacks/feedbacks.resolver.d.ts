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
import { FeedbacksService } from './feedbacks.service';
export declare class FeedbacksResolver {
    private readonly feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/feedbacks.schema").FeedbacksDocument> & Omit<import("../models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, import("../models/feedbacks.schema").FeedbacksDocument> & Omit<import("../models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/feedbacks.schema").FeedbacksDocument>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/feedbacks.schema").FeedbacksDocument> & Omit<import("../models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, import("../models/feedbacks.schema").FeedbacksDocument> & Omit<import("../models/feedbacks.schema").Feedbacks & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/feedbacks.schema").FeedbacksDocument>;
    removeFeedback(id: string): Promise<string>;
}
