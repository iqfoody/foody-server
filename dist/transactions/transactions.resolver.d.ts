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
import { TransactionsService } from './transactions.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { LimitEntity } from 'src/constants/limitEntity';
export declare class TransactionsResolver {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    createTransaction(createTransactionInput: CreateTransactionInput): Promise<import("mongoose").Document<unknown, {}, import("../models/transactions.schema").TransactionsDocument> & Omit<import("../models/transactions.schema").Transactions & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAmount(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findPoints(limitEntity: LimitEntity): Promise<{
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
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/transactions.schema").TransactionsDocument> & Omit<import("../models/transactions.schema").Transactions & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, import("../models/transactions.schema").TransactionsDocument> & Omit<import("../models/transactions.schema").Transactions & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/transactions.schema").TransactionsDocument>;
    updateTransaction(updateTransactionInput: UpdateTransactionInput): Promise<string>;
    removeTransaction(id: string): Promise<string>;
}
