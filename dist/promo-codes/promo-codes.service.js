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
const users_service_1 = require("../users/users.service");
let PromoCodesService = class PromoCodesService {
    PromoCodesModel;
    usersService;
    constructor(PromoCodesModel, usersService) {
        this.PromoCodesModel = PromoCodesModel;
        this.usersService = usersService;
    }
    async findPromoCodes(phoneNumber) {
        const { _id } = await this.usersService.findId(phoneNumber);
        return this.PromoCodesModel.find({ $and: [{ user: _id }, { state: "Active" }] });
    }
    async check(name, phoneNumber) {
        if (!name)
            throw new common_1.BadRequestException("this promo code isn't valid");
        const { _id } = await this.usersService.findId(phoneNumber);
        const promoCode = await this.PromoCodesModel.findOne({ $and: [{ name }, { expire: { $gte: new Date() } }, { state: "Active" }] });
        if (promoCode) {
            if (promoCode?.users && promoCode?.users.includes(_id))
                throw new common_1.NotAcceptableException('Promo code had used');
            if (promoCode?.usageTimes && promoCode?.usageTimes > 0 && promoCode?.usageTimes <= promoCode?.users?.length)
                throw new common_1.NotAcceptableException('Promo code had expired');
            if (promoCode.isPublic) {
                return { name: promoCode.name, discount: promoCode?.discount, type: promoCode.type };
            }
            else {
                if (promoCode?.user && _id == promoCode?.user) {
                    return { name: promoCode.name, discount: promoCode?.discount, type: promoCode.type };
                }
                else
                    throw new common_1.NotFoundException('Promo code not found');
            }
        }
        else
            throw new common_1.NotFoundException('Promo code not found');
    }
    async usePromoCode(name, user) {
        const promoCode = await this.PromoCodesModel.findOne({ $and: [{ name }, { expire: { $gte: new Date() } }, { state: "Active" }] });
        if (promoCode) {
            if (promoCode?.users && promoCode?.users.includes(user))
                throw new common_1.NotAcceptableException('Promo code had used');
            if (promoCode?.usageTimes && promoCode?.usageTimes > 0 && promoCode?.usageTimes <= promoCode?.users?.length)
                throw new common_1.NotAcceptableException('Promo code had expired');
            if (promoCode.isPublic) {
                promoCode.users.push(user);
                await this.PromoCodesModel.findByIdAndUpdate(promoCode._id, { users: promoCode.users });
                return "Verifyed";
            }
            else {
                if (promoCode?.user && user == promoCode?.user) {
                    promoCode.users.push(user);
                    await this.PromoCodesModel.findByIdAndUpdate(promoCode._id, { users: promoCode.users });
                    return "Verifyed";
                }
                else
                    throw new common_1.NotFoundException('Promo code not found');
            }
        }
        else
            throw new common_1.NotFoundException('Promo code not found');
    }
    async create(createPromoCodeInput) {
        const { name, user, type, discount, isPublic, expire, usageTimes } = createPromoCodeInput;
        if (isPublic) {
            return this.PromoCodesModel.create({ name, type, discount, isPublic, expire, usageTimes });
        }
        else {
            const promoCode = await this.PromoCodesModel.create(createPromoCodeInput);
            return promoCode.populate("user");
        }
    }
    async checkPromoCode(checkPromoCodeInput) {
        if (!checkPromoCodeInput?.name || !checkPromoCodeInput?.user)
            throw new common_1.BadRequestException("this promo code isn't valid");
        const { _id } = await this.usersService.findOne(checkPromoCodeInput.user);
        const promoCode = await this.PromoCodesModel.findOne({ $and: [{ name: checkPromoCodeInput.name }, { expire: { $gte: new Date() } }, { state: "Active" }] });
        if (promoCode) {
            if (promoCode?.users && promoCode?.users.includes(_id))
                throw new common_1.NotAcceptableException('Promo code had used');
            if (promoCode?.usageTimes && promoCode?.usageTimes > 0 && promoCode?.usageTimes <= promoCode?.users?.length)
                throw new common_1.NotAcceptableException('Promo code had expired');
            if (promoCode.isPublic) {
                return promoCode;
            }
            else {
                if (promoCode?.user && _id == promoCode?.user) {
                    return promoCode;
                }
                else
                    throw new common_1.NotFoundException('Promo code not found');
            }
        }
        else
            throw new common_1.NotFoundException('Promo code not found or expire');
    }
    findAll() {
        return this.PromoCodesModel.find().populate("user").sort({ _id: -1 });
    }
    findOne(id) {
        return this.PromoCodesModel.findById(id).populate("user");
    }
    async update(id, updatePromoCodeInput) {
        await this.PromoCodesModel.findByIdAndUpdate(id, updatePromoCodeInput);
        return "Success";
    }
    async state(stateInput) {
        await this.PromoCodesModel.findByIdAndUpdate(stateInput.id, stateInput);
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
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], PromoCodesService);
exports.PromoCodesService = PromoCodesService;
//# sourceMappingURL=promo-codes.service.js.map