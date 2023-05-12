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
exports.RatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RatesService = class RatesService {
    constructor(RatesModel) {
        this.RatesModel = RatesModel;
    }
    create(createRateInput) {
        return this.RatesModel.create(createRateInput);
    }
    async rateDriver(createRateInput) {
        if (!(createRateInput === null || createRateInput === void 0 ? void 0 : createRateInput.driver) || !(createRateInput === null || createRateInput === void 0 ? void 0 : createRateInput.user))
            throw new common_1.BadRequestException("driver & user required");
        await this.RatesModel.create(createRateInput);
        return "Success";
    }
    async rateResaurant(createRateInput) {
        if (!(createRateInput === null || createRateInput === void 0 ? void 0 : createRateInput.restaurant) || !(createRateInput === null || createRateInput === void 0 ? void 0 : createRateInput.user))
            throw new common_1.BadRequestException("restaurant & user required");
        const rates = await this.RatesModel.aggregate([{ $match: { restaurant: { $eq: { $toObjectId: createRateInput.restaurant } } } }, { $group: { _id: "$restaurant", rating: { $avg: "$rate" } } }]);
        const total = await this.RatesModel.countDocuments({ restaurant: createRateInput.restaurant });
        console.log(createRateInput.restaurant);
        console.log(rates, total);
        const newValue = createRateInput.rate / total + 1;
        const newRatingValue = rates.rate + newValue;
        await this.RatesModel.create(createRateInput);
        return { rating: newRatingValue, rates: total + 1 };
    }
    findAll() {
        return this.RatesModel.find();
    }
    findOne(id) {
        return this.RatesModel.findById(id);
    }
    async update(id, updateRateInput) {
        await this.RatesModel.findByIdAndUpdate(id, updateRateInput);
        return "Success";
    }
    async remove(id) {
        await this.RatesModel.findByIdAndDelete(id);
        return "Success";
    }
};
RatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Rates")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RatesService);
exports.RatesService = RatesService;
//# sourceMappingURL=rates.service.js.map