import { NotificationsService } from './notifications.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { LimitEntity } from 'src/constants/limitEntity';
export declare class NotificationsResolver {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    createNotification(createNotificationInput: CreateNotificationInput): Promise<any>;
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
    removeNotification(id: string): Promise<string>;
}
