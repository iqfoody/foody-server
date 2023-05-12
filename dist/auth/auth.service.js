"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const enums_1 = require("../constants/enums");
const admins_service_1 = require("../admins/admins.service");
const drivers_service_1 = require("../drivers/drivers.service");
const bcryptjs_1 = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersService, jwtService, adminsService, driversService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.adminsService = adminsService;
        this.driversService = driversService;
        this.cookieOptions = {
            domain: 'https://admin.iqfoody.com',
            secure: true,
            sameSite: 'lax',
            httpOnly: true,
            path: '/',
            maxAge: 1000 * 60 * 60 * 24
        };
        this.cookieRefreshOptions = {
            domain: 'https://admin.iqfoody.com',
            secure: true,
            sameSite: 'lax',
            httpOnly: true,
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 90
        };
        this.accessOptions = { secret: process.env.ACCESS_TOKEN_USERS, expiresIn: enums_1.constants.jwtAccess };
        this.refreshOptions = { secret: process.env.REFRESH_TOKEN_USERS, expiresIn: enums_1.constants.jwtRefresh };
    }
    async validateUser(loginInput) {
        if (loginInput.password.length < 6)
            throw new common_1.BadRequestException('password E0004');
        const user = await this.usersService.login(loginInput);
        if (user)
            return user;
        if (loginInput.username.length === 11) {
            throw new common_1.BadRequestException('phoneNumber E0010');
        }
        else {
            throw new common_1.BadRequestException('email E0001');
        }
    }
    async login(context, loginInput) {
        const ip = context === null || context === void 0 ? void 0 : context.ip;
        const platform = context === null || context === void 0 ? void 0 : context.get('user-agent');
        const result = await this.getTokens(context.user, "User");
        const refreshToken = await (0, bcryptjs_1.hash)(result.refreshToken, 10);
        result.user.refreshToken = result.refreshToken;
        await this.usersService.updateAny(context.user._id, { refreshToken, ip, platform, deviceToken: loginInput.deviceToken });
        return { user: result.user, accessToken: result.accessToken };
    }
    async loginAdmin(context, loginInput) {
        var _a, _b;
        if (loginInput.password.length < 6)
            throw new Error('password E0004');
        const admin = await this.adminsService.login(loginInput);
        if (!admin)
            throw new Error('email E0001');
        const result = await this.getTokens(admin, "Admin");
        const refreshToken = await (0, bcryptjs_1.hash)(result.refreshToken, 10);
        const ip = (_a = context.req) === null || _a === void 0 ? void 0 : _a.ip;
        const platform = (_b = context.req) === null || _b === void 0 ? void 0 : _b.get('user-agent');
        await this.adminsService.updateAny(admin._id, { refreshToken, ip, platform, deviceToken: loginInput.deviceToken });
        context.res.cookie('osk', result.accessToken, this.cookieOptions);
        context.res.cookie('iop', result.refreshToken, this.cookieRefreshOptions);
        return result;
    }
    async loginDriver(context, loginInput) {
        if (loginInput.password.length < 6)
            throw new Error('password E0004');
        const driver = await this.driversService.login(loginInput);
        if (!driver)
            throw new Error('email E0001');
        const result = await this.getTokens(driver, "Driver");
        const refreshToken = await (0, bcryptjs_1.hash)(result.refreshToken, 10);
        const ip = context.ip;
        const platform = context === null || context === void 0 ? void 0 : context.get('user-agent');
        await this.driversService.updateAny(driver._id, { refreshToken, ip, platform, deviceToken: loginInput.deviceToken });
        return result;
    }
    async signup(createUserInput, context) {
        if (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.phoneNumber) {
            let E0011 = await this.usersService.findByPhoneNumber(createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.phoneNumber);
            if (E0011)
                throw new common_1.BadRequestException('phoneNumber E0011');
        }
        const ip = context === null || context === void 0 ? void 0 : context.ip;
        const platform = context === null || context === void 0 ? void 0 : context.get('user-agent');
        const user = await this.usersService.create(Object.assign(Object.assign({}, createUserInput), { ip, platform }));
        const result = await this.getTokens(user, "User");
        const refreshToken = await (0, bcryptjs_1.hash)(result.refreshToken, 10);
        await this.usersService.updateAny(user._id, { refreshToken });
        result.user.refreshToken = result.refreshToken;
        return { user: result.user, accessToken: result.accessToken };
    }
    async logout(context, type) {
        if (type === "User") {
            await this.usersService.logout(context.user._id);
            return 'success';
        }
        else if (type === "Admin") {
            await this.adminsService.logout(context.req.user._id);
        }
        else if (type === "Driver") {
            await this.driversService.logout(context.user._id);
        }
        context.res.cookie('osk', '', Object.assign(Object.assign({}, this.cookieOptions), { maxAge: 0 }));
        context.res.cookie('iop', '', Object.assign(Object.assign({}, this.cookieOptions), { maxAge: 0 }));
        return 'success';
    }
    async refresh(context, type) {
        if (type === "User") {
            const user = await this.usersService.refresh(context.user._id, context.user.refreshToken);
            const accessToken = await this.getNewAccessToken(user);
            return accessToken;
        }
        else if (type === "Driver") {
            const driver = await this.driversService.refresh(context.user._id, context.user.refreshToken);
            const accessToken = await this.getNewAccessToken(driver);
            return accessToken;
        }
        else {
            const admin = await this.adminsService.refresh(context.req.user._id, context.req.user.refreshToken);
            const accessToken = await this.getNewAccessToken(admin);
            context.res.cookie('osk', accessToken, this.cookieOptions);
            return "success";
        }
    }
    async getTokens(user, metadata) {
        const userData = { _id: user === null || user === void 0 ? void 0 : user._id, type: user === null || user === void 0 ? void 0 : user.type, name: user === null || user === void 0 ? void 0 : user.name, phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber, email: user === null || user === void 0 ? void 0 : user.email, metadata };
        const [at, rt] = await Promise.all([
            this.jwtService.sign(userData, this.accessOptions),
            this.jwtService.sign(userData, this.refreshOptions),
        ]);
        return { accessToken: at, refreshToken: rt, user };
    }
    async getNewAccessToken(user) {
        const userData = { _id: user === null || user === void 0 ? void 0 : user._id, type: user === null || user === void 0 ? void 0 : user.type, name: user === null || user === void 0 ? void 0 : user.name, phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber, email: user === null || user === void 0 ? void 0 : user.email };
        return this.jwtService.sign(userData, this.accessOptions);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        admins_service_1.AdminsService,
        drivers_service_1.DriversService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map