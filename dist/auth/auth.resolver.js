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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
const login_input_1 = require("./dto/login.input");
const loginAdmin_entity_1 = require("./entities/loginAdmin.entity");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const refreshAuth_guard_1 = require("../guards/refreshAuth.guard");
const admin_entity_1 = require("../admins/entities/admin.entity");
let AuthResolver = class AuthResolver {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    loginAdmin(loginAdminInput, context) {
        return this.authService.loginAdmin(context, loginAdminInput);
    }
    infoAdmin(context) {
        return this.authService.findInfoAdmin(context);
    }
    async logoutAdmin(context) {
        return this.authService.logout(context, "Admin");
    }
    async refresh(context) {
        return this.authService.refresh(context, "Admin");
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => loginAdmin_entity_1.LoginAdmin),
    __param(0, (0, graphql_1.Args)('loginAdminInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "loginAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => admin_entity_1.Admin, { name: 'infoAdmin' }),
    (0, common_1.UseGuards)(refreshAuth_guard_1.RefreshAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "infoAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logoutAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    (0, common_1.UseGuards)(refreshAuth_guard_1.RefreshAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refresh", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map