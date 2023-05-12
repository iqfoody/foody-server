"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCodesModule = void 0;
const common_1 = require("@nestjs/common");
const promo_codes_service_1 = require("./promo-codes.service");
const promo_codes_resolver_1 = require("./promo-codes.resolver");
const promo_codes_controller_1 = require("./promo-codes.controller");
const mongoose_1 = require("@nestjs/mongoose");
const promoCodes_schema_1 = require("../models/promoCodes.schema");
let PromoCodesModule = class PromoCodesModule {
};
PromoCodesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "PromoCodes", schema: promoCodes_schema_1.PromoCodesSchema }]),
        ],
        providers: [promo_codes_resolver_1.PromoCodesResolver, promo_codes_service_1.PromoCodesService],
        exports: [promo_codes_service_1.PromoCodesService],
        controllers: [promo_codes_controller_1.PromoCodesController]
    })
], PromoCodesModule);
exports.PromoCodesModule = PromoCodesModule;
//# sourceMappingURL=promo-codes.module.js.map