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
exports.AdminsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const admins_service_1 = require("./admins.service");
const admin_entity_1 = require("./entities/admin.entity");
const create_admin_input_1 = require("./dto/create-admin.input");
const update_admin_input_1 = require("./dto/update-admin.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const state_input_1 = require("../constants/state.input");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const update_password_user_input_1 = require("../users/dto/update-password-user.input");
let AdminsResolver = class AdminsResolver {
    adminsService;
    constructor(adminsService) {
        this.adminsService = adminsService;
    }
    createAdmin(createAdminInput, context) {
        return this.adminsService.create(context.req.user._id, createAdminInput, null);
    }
    findAll() {
        return this.adminsService.findAll();
    }
    findOne(id) {
        return this.adminsService.findOne(id);
    }
    updateAdmin(updateAdminInput) {
        return this.adminsService.update(updateAdminInput.id, updateAdminInput);
    }
    async passwordUser(passwordAdminInput) {
        return this.adminsService.passwordAdmin(passwordAdminInput.id, passwordAdminInput);
    }
    async stateAdmin(stateInput) {
        return this.adminsService.state(stateInput);
    }
    removeAdmin(id) {
        return this.adminsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => admin_entity_1.Admin),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: admin_entity_1.Admin }),
    __param(0, (0, graphql_1.Args)('createAdminInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_input_1.CreateAdminInput, Object]),
    __metadata("design:returntype", void 0)
], AdminsResolver.prototype, "createAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => [admin_entity_1.Admin], { name: 'admins' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: admin_entity_1.Admin }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => admin_entity_1.Admin, { name: 'admin' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: admin_entity_1.Admin }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: admin_entity_1.Admin }),
    __param(0, (0, graphql_1.Args)('updateAdminInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_admin_input_1.UpdateAdminInput]),
    __metadata("design:returntype", void 0)
], AdminsResolver.prototype, "updateAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'passwordAdmin' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: admin_entity_1.Admin }),
    __param(0, (0, graphql_1.Args)('passwordAdminInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_user_input_1.UpdatePasswordUser]),
    __metadata("design:returntype", Promise)
], AdminsResolver.prototype, "passwordUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.State, subject: admin_entity_1.Admin }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", Promise)
], AdminsResolver.prototype, "stateAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: admin_entity_1.Admin }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminsResolver.prototype, "removeAdmin", null);
AdminsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => admin_entity_1.Admin),
    __metadata("design:paramtypes", [admins_service_1.AdminsService])
], AdminsResolver);
exports.AdminsResolver = AdminsResolver;
//# sourceMappingURL=admins.resolver.js.map