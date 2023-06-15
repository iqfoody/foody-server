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
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationsService } from './notifications.service';
import { CreateNotificationInput } from './dto/create-notification.input';
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly firebaseService;
    constructor(notificationsService: NotificationsService, firebaseService: FirebaseService);
    getMealsInfinty(limit: number, page: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../models/notifications.schema").NotificationsDocument> & Omit<import("../models/notifications.schema").Notifications & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        pages: number;
    }>;
    createRestaurant(createNotificationInput: CreateNotificationInput, file: any): Promise<any>;
}
