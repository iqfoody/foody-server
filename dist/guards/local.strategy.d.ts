import { Request } from "express";
import { Strategy } from 'passport-local';
import { AuthService } from "src/auth/auth.service";
import { FirebaseService } from "src/firebase/firebase.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private firebaseService;
    constructor(authService: AuthService, firebaseService: FirebaseService);
    validate(request: Request): Promise<any>;
}
export {};
