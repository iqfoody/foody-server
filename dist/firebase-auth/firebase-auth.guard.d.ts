import { CanActivate, ExecutionContext } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UsersService } from 'src/users/users.service';
export declare class FirebaseAuthGuard implements CanActivate {
    private usersService;
    private firebaseService;
    constructor(usersService: UsersService, firebaseService: FirebaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
