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
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { LimitEntity } from 'src/constants/limitEntity';
export declare class OrdersResolver {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderInput: CreateOrderInput): Promise<import("mongoose").Document<unknown, {}, import("../models/orders.schema").OrdersDocument> & Omit<import("../models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../models/orders.schema").OrdersDocument> & Omit<import("../models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        page: number;
    }>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/orders.schema").OrdersDocument> & Omit<import("../models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, import("../models/orders.schema").OrdersDocument> & Omit<import("../models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("../models/orders.schema").OrdersDocument>;
    updateOrder(updateOrderInput: UpdateOrderInput): Promise<string>;
    removeOrder(id: string): Promise<string>;
}
