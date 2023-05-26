import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CookieOptions } from 'express';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AdminsService } from 'src/admins/admins.service';
import { DriversService } from 'src/drivers/drivers.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private adminsService;
    private driversService;
    cookieOptions: CookieOptions;
    cookieRefreshOptions: CookieOptions;
    accessOptions: any;
    refreshOptions: any;
    constructor(usersService: UsersService, jwtService: JwtService, adminsService: AdminsService, driversService: DriversService);
    validateUser(loginInput: LoginInput): Promise<import("../models/users.schema").UsersDocument>;
    login(context: any, loginInput: LoginInput): Promise<{
        user: any;
        accessToken: string;
    }>;
    loginAdmin(context: any, loginInput: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    loginDriver(context: any, loginInput: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    signup(createUserInput: CreateUserInput, context: any): Promise<{
        user: any;
        accessToken: string;
    }>;
    logout(context: any, type: string): Promise<string>;
    refresh(context: any, type: string): Promise<string>;
    getTokens(user: any, metadata: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    getNewAccessToken(user: any, metadata: string): Promise<string>;
}
