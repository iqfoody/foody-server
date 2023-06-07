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
const aws_service_1 = require("../aws/aws.service");
let RatesService = class RatesService {
    RatesModel;
    awsService;
    constructor(RatesModel, awsService) {
        this.RatesModel = RatesModel;
        this.awsService = awsService;
    }
    create(createRateInput) {
        return this.RatesModel.create(createRateInput);
    }
    async rateDriver(createRateInput) {
        if (!createRateInput?.driver || !createRateInput?.user)
            throw new common_1.BadRequestException("driver & user required");
        if (!(0, mongoose_2.isValidObjectId)(createRateInput.driver))
            throw new common_1.BadRequestException("There isn't driver with this id");
        await this.RatesModel.create(createRateInput);
        return "Success";
    }
    async rateResaurant(createRateInput) {
        if (!createRateInput?.restaurant || !createRateInput?.user)
            throw new common_1.BadRequestException("restaurant & user required");
        if (!(0, mongoose_2.isValidObjectId)(createRateInput.restaurant))
            throw new common_1.BadRequestException("There isn't restaurant with this id");
        const rate = await this.RatesModel.create(createRateInput);
        if (!rate)
            throw new common_1.BadRequestException("rating hasn't created.");
        const objectId = new mongoose_2.mongo.ObjectId(createRateInput.restaurant);
        const result = await this.RatesModel.aggregate([{ $match: { restaurant: objectId } }, { $group: { _id: "$restaurant", rating: { $avg: "$rate" }, rates: { $sum: 1 } } }]);
        if (result[0]) {
            const { rating, rates } = result[0];
            return { rating, rates };
        }
        return { rating: createRateInput.rate, rates: 1 };
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
    async home() {
        const rating = await this.RatesModel.aggregate([
            { $group: { _id: "rating", rating: { $avg: "$rate" }, total: { $sum: 1 } } }
        ]);
        const recentlyRating = await this.RatesModel.find().sort({ _id: -1 }).limit(10).populate({ path: "user", select: { name: 1, image: 1 } }).select(["-__v", "-_id", "-restaurant"]);
        for (const single of recentlyRating) {
            if (single?.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { rating: rating[0]?.rating, recentlyRating, total: rating[0]?.total };
    }
};
RatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Rates")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], RatesService);
exports.RatesService = RatesService;
//# sourceMappingURL=rates.service.js.map