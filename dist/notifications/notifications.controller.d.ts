import { FirebaseService } from 'src/firebase/firebase.service';
export declare class NotificationsController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    sendPublic(): Promise<string>;
}
