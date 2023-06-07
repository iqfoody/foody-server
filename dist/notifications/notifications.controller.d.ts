import { FirebaseService } from 'src/firebase/firebase.service';
export declare class NotificationsController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    getMealsInfinty(limit: number, page: number): Promise<void>;
    sendPublic(): Promise<void>;
}
