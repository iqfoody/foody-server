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
exports.AdvertisementsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_service_1 = require("../aws/aws.service");
let AdvertisementsService = class AdvertisementsService {
    AdvertisementsModel;
    awsService;
    constructor(AdvertisementsModel, awsService) {
        this.AdvertisementsModel = AdvertisementsModel;
        this.awsService = awsService;
    }
    async findAdvertisements() {
        const advertisements = await this.AdvertisementsModel.find({ state: "Active" }, { title: 1, titleEN: 1, titleKR: 1, image: 1, type: 1, restaurant: 1, meal: 1 });
        for (const single of advertisements) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return advertisements;
    }
    async findAdvertisement(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't advertisement with this id");
        const advertisement = await this.AdvertisementsModel.findOne({ $and: [{ _id: id }, { state: "Active" }] }, { title: 1, titleEN: 1, titleKR: 1, image: 1, type: 1 });
        if (advertisement?.image)
            advertisement.image = this.awsService.getUrl(advertisement.image);
        return advertisement;
    }
    async create(createAdvertisementInput) {
        if (!createAdvertisementInput?.image)
            return new common_1.BadRequestException("image required");
        const position = await this.AdvertisementsModel.countDocuments();
        const advertisement = new this.AdvertisementsModel({ ...createAdvertisementInput, position });
        const result = await this.awsService.createImage(createAdvertisementInput.image, advertisement._id);
        advertisement.image = result?.Key;
        await advertisement.save();
        advertisement.image = this.awsService.getUrl(result?.Key);
        return advertisement;
    }
    async findAll() {
        const advertisements = await this.AdvertisementsModel.find();
        for (const single of advertisements) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return advertisements;
    }
    async findOne(id) {
        const advertisement = await this.AdvertisementsModel.findById(id).populate([
            { path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } },
            { path: "meal", select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } },
            { path: "user", select: { name: 1, phoneNumber: 1, image: 1 } },
        ]);
        if (advertisement?.image)
            advertisement.image = this.awsService.getUrl(advertisement.image);
        if (advertisement?.restaurant?.image)
            advertisement.restaurant.image = this.awsService.getUrl(advertisement.restaurant.image);
        if (advertisement?.meal?.image)
            advertisement.meal.image = this.awsService.getUrl(advertisement.meal.image);
        if (advertisement?.user?.image)
            advertisement.user.image = this.awsService.getUrl(advertisement.user.image);
        return advertisement;
    }
    async update(id, updateAdvertisementInput) {
        if (updateAdvertisementInput?.image) {
            const { image } = await this.AdvertisementsModel.findOne({ _id: updateAdvertisementInput.id }, { image: 1, _id: 0 });
            this.awsService.removeImage(image);
            const result = await this.awsService.createImage(updateAdvertisementInput.image, id);
            await this.AdvertisementsModel.findByIdAndUpdate(id, { ...updateAdvertisementInput, image: result?.Key });
        }
        else {
            await this.AdvertisementsModel.findByIdAndUpdate(id, updateAdvertisementInput);
        }
        return "Success";
    }
    async state(stateInput) {
        await this.AdvertisementsModel.findByIdAndUpdate(stateInput.id, stateInput);
        return "Success";
    }
    async position(updatePositionInput) {
        for (const single of updatePositionInput) {
            await this.AdvertisementsModel.findByIdAndUpdate(single.id, { position: single.position });
        }
        return "success";
    }
    async remove(id) {
        const result = await this.AdvertisementsModel.findOne({ _id: id }, { image: 1, _id: 0 });
        try {
            if (result?.image)
                await this.awsService.removeImage(result.image);
            await this.AdvertisementsModel.findByIdAndDelete(id);
            return "Success";
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
AdvertisementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Advertisements")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], AdvertisementsService);
exports.AdvertisementsService = AdvertisementsService;
//# sourceMappingURL=advertisements.service.js.map