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
exports.PromoCodesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PromoCodesService = class PromoCodesService {
    constructor(PromoCodesModel) {
        this.PromoCodesModel = PromoCodesModel;
    }
    create(createPromoCodeInput) {
        return this.PromoCodesModel.create(createPromoCodeInput);
    }
    findAll() {
        return this.PromoCodesModel.find();
    }
    findPromoCodes(user) {
        return this.PromoCodesModel.find({ $and: [{ user }, { state: "Active" }] });
    }
    findOne(id) {
        return this.PromoCodesModel.findById(id);
    }
    async check(name, user) {
        var _a;
        const promoCode = await this.PromoCodesModel.findOne({ $and: [{ name }, { user }, { public: false }, { state: "Active" }] });
        if (promoCode && (promoCode === null || promoCode === void 0 ? void 0 : promoCode.users) && ((_a = promoCode === null || promoCode === void 0 ? void 0 : promoCode.users) === null || _a === void 0 ? void 0 : _a.includes(user))) {
            throw new common_1.NotAcceptableException('Promo code expired');
        }
        else if (promoCode) {
            return { _id: promoCode._id, name: promoCode.name, discount: promoCode === null || promoCode === void 0 ? void 0 : promoCode.discount, type: promoCode.type };
        }
        else {
            const publicPromoCode = await this.PromoCodesModel.findOne({ $and: [{ name }, { public: true }, { state: "Active" }] });
            if (publicPromoCode && (publicPromoCode === null || publicPromoCode === void 0 ? void 0 : publicPromoCode.users) && (publicPromoCode === null || publicPromoCode === void 0 ? void 0 : publicPromoCode.users.includes(user))) {
                throw new common_1.NotAcceptableException('Promo code had used');
            }
            else if (publicPromoCode) {
                return { _id: publicPromoCode._id, name: publicPromoCode.name, discount: publicPromoCode.discount, type: publicPromoCode.type };
            }
        }
        return new common_1.NotFoundException('Promo code not found');
    }
    async usePromoCode(name, user) {
        var _a;
        const promoCode = await this.PromoCodesModel.findOne({ $and: [{ name }, { user }, { public: false }, { state: "Active" }] });
        if (promoCode && (promoCode === null || promoCode === void 0 ? void 0 : promoCode.users) && ((_a = promoCode === null || promoCode === void 0 ? void 0 : promoCode.users) === null || _a === void 0 ? void 0 : _a.includes(user))) {
            return new common_1.NotAcceptableException('Promo code expired');
        }
        else if (promoCode) {
            promoCode.users.push(user);
            await this.PromoCodesModel.findByIdAndUpdate(promoCode._id, { users: promoCode.users });
            return "Verifyed";
        }
        else {
            const publicPromoCode = await this.PromoCodesModel.findOne({ $and: [{ name }, { public: true }, { state: "Active" }] });
            if (publicPromoCode && (publicPromoCode === null || publicPromoCode === void 0 ? void 0 : publicPromoCode.users) && (publicPromoCode === null || publicPromoCode === void 0 ? void 0 : publicPromoCode.users.includes(user))) {
                return new common_1.NotAcceptableException('Promo code had used');
            }
            else if (publicPromoCode) {
                publicPromoCode.users.push(user);
                await this.PromoCodesModel.findByIdAndUpdate(publicPromoCode._id, { users: publicPromoCode.users });
                return "Verifyed";
            }
        }
        return new common_1.NotFoundException('Promo code not found');
    }
    async update(id, updatePromoCodeInput) {
        await this.PromoCodesModel.findByIdAndUpdate(id, updatePromoCodeInput);
        return "Success";
    }
    async remove(id) {
        await this.PromoCodesModel.findByIdAndDelete(id);
        return "Success";
    }
};
PromoCodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("PromoCodes")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PromoCodesService);
exports.PromoCodesService = PromoCodesService;
//# sourceMappingURL=promo-codes.service.js.map