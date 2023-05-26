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
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Model } from 'mongoose';
import { TransactionsDocument } from 'src/models/transactions.schema';
import { LimitEntity } from 'src/constants/limitEntity';
import { AwsService } from 'src/aws/aws.service';
export declare class TransactionsService {
    private TransactionsModel;
    private readonly awsService;
    constructor(TransactionsModel: Model<TransactionsDocument>, awsService: AwsService);
    create(createTransactionInput: CreateTransactionInput): Promise<import("mongoose").Document<unknown, {}, TransactionsDocument> & Omit<import("src/models/transactions.schema").Transactions & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findPoints(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAmount(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findForUser(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findForAdmin(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, TransactionsDocument> & Omit<import("src/models/transactions.schema").Transactions & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, TransactionsDocument> & Omit<import("src/models/transactions.schema").Transactions & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, TransactionsDocument>;
    update(id: string, updateTransactionInput: UpdateTransactionInput): Promise<string>;
    remove(id: string): Promise<string>;
}
