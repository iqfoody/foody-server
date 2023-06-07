import firebase from 'firebase-admin';
export declare class FirebaseService {
    firebase: firebase.app.App;
    constructor();
    sendPrivate(): Promise<any>;
    sendPublic(data: any): Promise<void>;
}
