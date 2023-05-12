import { NotificationsService } from './notifications.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
export declare class NotificationsResolver {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    createNotification(createNotificationInput: CreateNotificationInput): string;
    findAll(): string;
    findOne(id: number): string;
    updateNotification(updateNotificationInput: UpdateNotificationInput): string;
    removeNotification(id: number): string;
}
