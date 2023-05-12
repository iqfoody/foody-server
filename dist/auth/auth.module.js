"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_resolver_1 = require("./auth.resolver");
const auth_controller_1 = require("./auth.controller");
const users_module_1 = require("../users/users.module");
const admins_module_1 = require("../admins/admins.module");
const drivers_module_1 = require("../drivers/drivers.module");
const aws_module_1 = require("../aws/aws.module");
const jwt_1 = require("@nestjs/jwt");
const local_strategy_1 = require("../guards/local.strategy");
const accessToken_strategy_1 = require("../guards/accessToken.strategy");
const refreshToken_strategy_1 = require("../guards/refreshToken.strategy");
const ability_module_1 = require("../ability/ability.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            admins_module_1.AdminsModule,
            drivers_module_1.DriversModule,
            jwt_1.JwtModule,
            aws_module_1.AwsModule,
            ability_module_1.AbilityModule,
        ],
        providers: [auth_resolver_1.AuthResolver, auth_service_1.AuthService, local_strategy_1.LocalStrategy, accessToken_strategy_1.AccessTokenStrategy, refreshToken_strategy_1.RefreshTokenStrategy],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map