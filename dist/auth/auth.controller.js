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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_input_1 = require("./dto/login.input");
const gqlAuth_guard_1 = require("../guards/gqlAuth.guard");
const create_user_input_1 = require("../users/dto/create-user.input");
const users_service_1 = require("../users/users.service");
const drivers_service_1 = require("../drivers/drivers.service");
const firebase_auth_guard_1 = require("../firebase-auth/firebase-auth.guard");
let AuthController = class AuthController {
    authService;
    usersService;
    driversService;
    constructor(authService, usersService, driversService) {
        this.authService = authService;
        this.usersService = usersService;
        this.driversService = driversService;
    }
    async login(loginInput, req) {
        return this.authService.login(req, loginInput);
    }
    async signup(createUserInput, req) {
        return this.authService.signup(createUserInput, req);
    }
    async info(req) {
        return this.usersService.info(req.user);
    }
    async loginDriver(loginInput, req) {
        return this.authService.loginDriver(req, loginInput);
    }
    async infoDriver(req) {
        return this.driversService.info(req.user);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)(gqlAuth_guard_1.GqlAuthGuard),
    __param(0, (0, common_1.Body)('loginUserInput')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Body)('createUserInput')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('/info'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "info", null);
__decorate([
    (0, common_1.Post)('/driver/login'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginDriver", null);
__decorate([
    (0, common_1.Get)('/driver/info'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "infoDriver", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        drivers_service_1.DriversService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map