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
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const refreshAuth_guard_1 = require("../guards/refreshAuth.guard");
const users_service_1 = require("../users/users.service");
const drivers_service_1 = require("../drivers/drivers.service");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const user_entity_1 = require("../users/entities/user.entity");
const driver_entity_1 = require("../drivers/entities/driver.entity");
let AuthController = class AuthController {
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
    async logout(req) {
        return this.authService.logout(req, "User");
    }
    async info(req) {
        return this.usersService.info(req.user._id);
    }
    async refresh(req) {
        return this.authService.refresh(req, "User");
    }
    async loginDriver(loginInput, req) {
        return this.authService.loginDriver(req, loginInput);
    }
    async logoutDriver(req) {
        return this.authService.logout(req, "Driver");
    }
    async infoDriver(req) {
        return this.driversService.info(req.user._id);
    }
    async refreshDriver(req) {
        return this.authService.refresh(req, "Driver");
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)(gqlAuth_guard_1.GqlAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/logout'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('/info'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Info, subject: user_entity_1.User }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "info", null);
__decorate([
    (0, common_1.Get)('/refresh'),
    (0, common_1.UseGuards)(refreshAuth_guard_1.RefreshAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Refresh, subject: user_entity_1.User }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('/driver/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginDriver", null);
__decorate([
    (0, common_1.Post)('/driver/logout'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutDriver", null);
__decorate([
    (0, common_1.Get)('/driver/info'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Info, subject: driver_entity_1.Driver }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "infoDriver", null);
__decorate([
    (0, common_1.Get)('/driver/refresh'),
    (0, common_1.UseGuards)(refreshAuth_guard_1.RefreshAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Refresh, subject: driver_entity_1.Driver }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshDriver", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        drivers_service_1.DriversService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map