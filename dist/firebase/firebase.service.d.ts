import firebase from 'firebase-admin';
import { Notification } from 'src/notifications/entities/notification.entity';
export declare class FirebaseService {
    firebase: firebase.app.App;
    constructor();
    sendPublicAdmin(data: Notification): Promise<any>;
    sendPrivate(data: Notification, token: string): Promise<any>;
    sendPublic(data: Notification): Promise<void>;
    checkAuth(token: string): Promise<string>;
}
