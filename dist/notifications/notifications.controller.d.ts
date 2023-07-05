import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotificationsInfinty(limit: number, page: number, req: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../models/notifications.schema").NotificationsDocument> & Omit<import("../models/notifications.schema").Notifications & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
}
