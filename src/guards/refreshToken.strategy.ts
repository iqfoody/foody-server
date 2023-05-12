import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            secretOrKey: process.env.REFRESH_TOKEN_USERS,
            passReqToCallback: true,
        });
    }

   async validate(req: Request, payload: any){
    const refreshToken = req.body.refresh;
    return {...payload, refreshToken };
   }
}