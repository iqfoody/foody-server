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
exports.PromoCodesController = void 0;
const common_1 = require("@nestjs/common");
const promo_codes_service_1 = require("./promo-codes.service");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const promo_code_entity_1 = require("./entities/promo-code.entity");
let PromoCodesController = class PromoCodesController {
    promoCodesService;
    constructor(promoCodesService) {
        this.promoCodesService = promoCodesService;
    }
    async getPromoCodes(req) {
        return this.promoCodesService.findPromoCodes(req.user._id);
    }
    async checkPromoCode(name, req) {
        return this.promoCodesService.check(name, req.user._id);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Info, subject: promo_code_entity_1.PromoCode }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromoCodesController.prototype, "getPromoCodes", null);
__decorate([
    (0, common_1.Get)('/:promoCode'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Info, subject: promo_code_entity_1.PromoCode }),
    __param(0, (0, common_1.Param)('promoCode')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PromoCodesController.prototype, "checkPromoCode", null);
PromoCodesController = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, common_1.Controller)('promo-codes'),
    __metadata("design:paramtypes", [promo_codes_service_1.PromoCodesService])
], PromoCodesController);
exports.PromoCodesController = PromoCodesController;
//# sourceMappingURL=promo-codes.controller.js.map