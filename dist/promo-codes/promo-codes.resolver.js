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
exports.PromoCodesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const promo_codes_service_1 = require("./promo-codes.service");
const promo_code_entity_1 = require("./entities/promo-code.entity");
const create_promo_code_input_1 = require("./dto/create-promo-code.input");
const update_promo_code_input_1 = require("./dto/update-promo-code.input");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
let PromoCodesResolver = class PromoCodesResolver {
    constructor(promoCodesService) {
        this.promoCodesService = promoCodesService;
    }
    createPromoCode(createPromoCodeInput) {
        return this.promoCodesService.create(createPromoCodeInput);
    }
    findAll() {
        return this.promoCodesService.findAll();
    }
    findOne(id) {
        return this.promoCodesService.findOne(id);
    }
    updatePromoCode(updatePromoCodeInput) {
        return this.promoCodesService.update(updatePromoCodeInput.id, updatePromoCodeInput);
    }
    removePromoCode(id) {
        return this.promoCodesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => promo_code_entity_1.PromoCode),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: promo_code_entity_1.PromoCode }),
    __param(0, (0, graphql_1.Args)('createPromoCodeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promo_code_input_1.CreatePromoCodeInput]),
    __metadata("design:returntype", void 0)
], PromoCodesResolver.prototype, "createPromoCode", null);
__decorate([
    (0, graphql_1.Query)(() => [promo_code_entity_1.PromoCode], { name: 'promoCodes' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: promo_code_entity_1.PromoCode }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromoCodesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => promo_code_entity_1.PromoCode, { name: 'promoCode' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: promo_code_entity_1.PromoCode }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoCodesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: promo_code_entity_1.PromoCode }),
    __param(0, (0, graphql_1.Args)('updatePromoCodeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_promo_code_input_1.UpdatePromoCodeInput]),
    __metadata("design:returntype", void 0)
], PromoCodesResolver.prototype, "updatePromoCode", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: promo_code_entity_1.PromoCode }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoCodesResolver.prototype, "removePromoCode", null);
PromoCodesResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => promo_code_entity_1.PromoCode),
    __metadata("design:paramtypes", [promo_codes_service_1.PromoCodesService])
], PromoCodesResolver);
exports.PromoCodesResolver = PromoCodesResolver;
//# sourceMappingURL=promo-codes.resolver.js.map