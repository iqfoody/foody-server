import { CreateNotificationInput } from './dto/create-notification.input';
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
    create(createNotificationInput: CreateNotificationInput): Promise<any>;
    sendPrivate(createNotificationInput: CreateNotificationInput): Promise<void>;
    findAll(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
    }>;
    findManagement(limitEntity: LimitEntity): Promise<{
        data: any;
        pages: number;
        orders: number;
    }>;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<string>;
}
