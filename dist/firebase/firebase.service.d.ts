import firebase from 'firebase-admin';
export declare class FirebaseService {
    firebase: firebase.app.App;
    constructor();
    sendPrivate(token: string, payload: any, data: any): Promise<void>;
    sendPublic(data: any): Promise<void>;
}
