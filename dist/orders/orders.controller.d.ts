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
import { CreateRateOrderInput } from './dto/create-rate-order.input';
import { orderStatus } from 'src/constants/types.type';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrderes(req: any, state?: orderStatus): Promise<any[]>;
    createOrder(createOrderInput: CreateOrderInput, req: any): Promise<import("mongoose").Document<unknown, {}, import("../models/orders.schema").OrdersDocument> & Omit<import("../models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    ratingOrder(id: string, createRateOrderInput: CreateRateOrderInput, req: any): Promise<string>;
    cancelOrder(id: string, req: any): Promise<string>;
    inDeliveryOrder(id: string, req: any): Promise<string>;
    completeOrder(id: string, recievedPrice: number, req: any): Promise<string>;
    getOrder(id: string, req: any): Promise<any>;
    deleteOrder(id: string, req: any): Promise<string>;
}
