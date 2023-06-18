import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationsService } from './notifications.service';
import { CreateNotificationInput } from './dto/create-notification.input';
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly firebaseService;
    constructor(notificationsService: NotificationsService, firebaseService: FirebaseService);
    getNotificationsInfinty(limit: number, page: number, req: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../models/notifications.schema").NotificationsDocument> & Omit<import("../models/notifications.schema").Notifications & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    createNotification(createNotificationInput: CreateNotificationInput, file: any): Promise<any>;
}
