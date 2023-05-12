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
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Model } from 'mongoose';
import { OrdersDocument } from 'src/models/orders.schema';
import { LimitEntity } from 'src/constants/limitEntity';
import { orderStatus } from 'src/constants/types.type';
import { StateInput } from 'src/constants/state.input';
import { MealsService } from 'src/meals/meals.service';
import { AwsService } from 'src/aws/aws.service';
import { PromoCodesService } from 'src/promo-codes/promo-codes.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { UsersService } from 'src/users/users.service';
import { RatesService } from 'src/rates/rates.service';
import { CreateRateOrderInput } from './dto/create-rate-order.input';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
export declare class OrdersService {
    private OrdersModel;
    private mealsService;
    private readonly awsService;
    private readonly promoCodeService;
    private readonly walletsService;
    private readonly usersService;
    private readonly ratesService;
    private readonly restaurantsService;
    constructor(OrdersModel: Model<OrdersDocument>, mealsService: MealsService, awsService: AwsService, promoCodeService: PromoCodesService, walletsService: WalletsService, usersService: UsersService, ratesService: RatesService, restaurantsService: RestaurantsService);
    create(createOrderInput: CreateOrderInput): Promise<import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createOrder(createOrderInput: CreateOrderInput): Promise<import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: (import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        page: number;
    }>;
    findOrders(user: string, state?: orderStatus): Promise<any[]>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, OrdersDocument>;
    findOrder(id: string, user: string): Promise<any>;
    update(id: string, updateOrderInput: UpdateOrderInput): Promise<string>;
    state(stateInput: StateInput): Promise<string>;
    cancelOrder(id: string, user: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, OrdersDocument>;
    inDeliveryOrder(id: string, driver: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, OrdersDocument>;
    completeOrder(id: string, driver: string, recievedPrice: number): import("mongoose").Query<import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Document<unknown, {}, OrdersDocument> & Omit<import("src/models/orders.schema").Orders & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, OrdersDocument>;
    rateOrder(createRateOrderInput: CreateRateOrderInput): Promise<string>;
    deleteOrder(id: string, user: string): Promise<string>;
    remove(id: string): Promise<string>;
}
