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
import { StateInput } from 'src/constants/state.input';
export declare class OrdersResolver {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderInput: CreateOrderInput): Promise<any>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    homeValues(): Promise<{
        orders: number;
        recentlyOrders: any;
        week: {
            d0: number;
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
        };
        status: {
            Pending: number;
            InProgress: number;
            InDelivery: number;
            Completed: number;
            Canceled: number;
        };
        users: number;
        recentlyUsers: (import("mongoose").Document<unknown, import("../models/users.schema").IUsersQueryHelpers, import("../models/users.schema").UsersDocument> & Omit<import("../models/users.schema").Users & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        rating: any;
        total: any;
        recentlyRating: any;
        restaurants: number;
        meals: number;
        drivers: number;
        transactions: {
            minusAmount: any;
            plusAmount: any;
            minusPoints: any;
            plusPoints: any;
        };
    }>;
    findAllUserOrders(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findAllDriverOrders(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findOne(id: string): Promise<any>;
    updateOrder(updateOrderInput: UpdateOrderInput): Promise<any>;
    stateOrder(stateInput: StateInput): Promise<string>;
    removeOrder(id: string): Promise<string>;
    profitsReports(date: string): Promise<{
        m0: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m1: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
        };
        m2: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m3: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m4: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m5: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m6: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m7: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m8: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m9: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m10: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m11: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
    }>;
    ordersReports(date: string): Promise<{
        m0: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m1: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
        };
        m2: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m3: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m4: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m5: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m6: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m7: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m8: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m9: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
        m10: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
        };
        m11: {
            d1: number;
            d2: number;
            d3: number;
            d4: number;
            d5: number;
            d6: number;
            d7: number;
            d8: number;
            d9: number;
            d10: number;
            d11: number;
            d12: number;
            d13: number;
            d14: number;
            d15: number;
            d16: number;
            d17: number;
            d18: number;
            d19: number;
            d20: number;
            d21: number;
            d22: number;
            d23: number;
            d24: number;
            d25: number;
            d26: number;
            d27: number;
            d28: number;
            d29: number;
            d30: number;
            d31: number;
        };
    }>;
}
