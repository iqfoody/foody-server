import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Request } from "express";
import { Strategy } from 'passport-local'
import { AuthService } from "src/auth/auth.service";
import { FirebaseService } from "src/firebase/firebase.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
    constructor(
        private authService: AuthService,
        private firebaseService: FirebaseService,
        ){
        super({
            passReqToCallback: true,
        });
    }

   async validate(request: Request) : Promise<any>{
       if(request.headers.authorization) {
            const token = request.headers.authorization.replace('Bearer', '').trim();
            if(!token) throw new UnauthorizedException('Access Denied')
            const phoneNumber = await this.firebaseService.checkAuth(token);
            console.log(phoneNumber)
            const user = await this.authService.validateUser(phoneNumber);
            if(!user) throw new UnauthorizedException('Access Denied');
            return user;
        } else throw new UnauthorizedException('Access Denied');
   }
}