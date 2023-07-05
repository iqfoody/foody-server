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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
const create_user_input_1 = require("./dto/create-user.input");
const update_user_input_1 = require("./dto/update-user.input");
const common_1 = require("@nestjs/common");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const usersResponse_entity_1 = require("./entities/usersResponse.entity");
const state_input_1 = require("../constants/state.input");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const limitEntity_1 = require("../constants/limitEntity");
const update_password_user_input_1 = require("./dto/update-password-user.input");
const reportsResults_entity_1 = require("../constants/reportsResults.entity");
const mongoose_1 = require("mongoose");
let UsersResolver = class UsersResolver {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserInput) {
        return this.usersService.createUser(createUserInput);
    }
    async findAll(limitEntity) {
        return this.usersService.findAllUsers(limitEntity);
    }
    async findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't user with this id");
        return this.usersService.findOne(id);
    }
    async updateUser(updateUserInput) {
        if (!(0, mongoose_1.isValidObjectId)(updateUserInput?.id))
            throw new common_1.BadRequestException("There isn't user with this id");
        return this.usersService.updateUser(updateUserInput.id, updateUserInput);
    }
    async passwordUser(passwordUserInput) {
        if (!(0, mongoose_1.isValidObjectId)(passwordUserInput?.id))
            throw new common_1.BadRequestException("There isn't user with this id");
        return this.usersService.passwordUser(passwordUserInput.id, passwordUserInput);
    }
    async stateUser(stateInput) {
        if (!(0, mongoose_1.isValidObjectId)(stateInput?.id))
            throw new common_1.BadRequestException("There isn't user with this id");
        return this.usersService.state(stateInput);
    }
    async removeUser(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't user with this id");
        return this.usersService.remove(id);
    }
    usersReports(date) {
        return this.usersService.usersReport(date);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: "User" }),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)(() => usersResponse_entity_1.UsersResponse, { name: 'users' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "User" }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'user' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "User" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "User" }),
    __param(0, (0, graphql_1.Args)('updateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'passwordUser' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "User" }),
    __param(0, (0, graphql_1.Args)('passwordUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_user_input_1.UpdatePasswordUser]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "passwordUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "User" }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "stateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: "User" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "removeUser", null);
__decorate([
    (0, graphql_1.Query)(() => reportsResults_entity_1.Months, { name: 'usersReport' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "User" }),
    __param(0, (0, graphql_1.Args)('date', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "usersReports", null);
UsersResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map