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
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { AwsService } from 'src/aws/aws.service';
import { Model } from 'mongoose';
import { NotificationsDocument } from 'src/models/notifications.schema';
import { UsersService } from 'src/users/users.service';
import { DriversService } from 'src/drivers/drivers.service';
import { OrdersService } from 'src/orders/orders.service';
import { LimitEntity } from 'src/constants/limitEntity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AdminsService } from 'src/admins/admins.service';
export declare class NotificationsService {
    private NotificationsModel;
    private usersService;
    private driversService;
    private adminsService;
    private ordersService;
    private mealsService;
    private restaurantsService;
    private readonly firebaseService;
    private readonly awsService;
    constructor(NotificationsModel: Model<NotificationsDocument>, usersService: UsersService, driversService: DriversService, adminsService: AdminsService, ordersService: OrdersService, mealsService: MealsService, restaurantsService: RestaurantsService, firebaseService: FirebaseService, awsService: AwsService);
    findNotifications(limitEntity: LimitEntity): Promise<{
        data: (import("mongoose").Document<unknown, {}, NotificationsDocument> & Omit<import("src/models/notifications.schema").Notifications & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    createVertual(createNotificationInput: CreateNotificationInput): Promise<string>;
    create(createNotificationInput: CreateNotificationInput, file: any): Promise<any>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findManagement(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, updateNotificationInput: UpdateNotificationInput): Promise<string>;
    remove(id: string): Promise<string>;
}
