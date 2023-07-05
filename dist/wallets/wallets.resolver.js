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
exports.WalletsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const wallets_service_1 = require("./wallets.service");
const wallet_entity_1 = require("./entities/wallet.entity");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const mongoose_1 = require("mongoose");
let WalletsResolver = class WalletsResolver {
    walletsService;
    constructor(walletsService) {
        this.walletsService = walletsService;
    }
    findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't wallet with this id");
        return this.walletsService.findOne(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => wallet_entity_1.Wallet, { name: 'wallet' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Wallet" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletsResolver.prototype, "findOne", null);
WalletsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => wallet_entity_1.Wallet),
    __metadata("design:paramtypes", [wallets_service_1.WalletsService])
], WalletsResolver);
exports.WalletsResolver = WalletsResolver;
//# sourceMappingURL=wallets.resolver.js.map