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
    constructor(AdvertisementsModel, awsService) {
        this.AdvertisementsModel = AdvertisementsModel;
        this.awsService = awsService;
    }
    async create(createAdvertisementInput, file) {
        if (!file)
            return new common_1.BadRequestException("image required");
        const position = await this.AdvertisementsModel.countDocuments();
        const advertisement = new this.AdvertisementsModel(Object.assign(Object.assign({}, createAdvertisementInput), { position }));
        const result = await this.awsService.createImage(file, advertisement._id);
        advertisement.image = result === null || result === void 0 ? void 0 : result.Key;
        await advertisement.save();
        advertisement.image = this.awsService.getUrl(result === null || result === void 0 ? void 0 : result.Key);
        return advertisement;
    }
    async findAll() {
        const advertisements = await this.AdvertisementsModel.find();
        for (const single of advertisements) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return advertisements;
    }
    async findAdvertisements() {
        const advertisements = await this.AdvertisementsModel.find({ state: "Active" }, { title: 1, titleEN: 1, titleKR: 1, image: 1, type: 1, target: 1, _id: 0 });
        for (const single of advertisements) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return advertisements;
    }
    async findOne(id) {
        const advertisement = await this.AdvertisementsModel.findById(id);
        if (advertisement === null || advertisement === void 0 ? void 0 : advertisement.image)
            advertisement.image = this.awsService.getUrl(advertisement.image);
        return advertisement;
    }
    async findAdvertisement(id) {
        const advertisement = await this.AdvertisementsModel.findOne({ $and: [{ _id: id }, { state: "Active" }] }, { title: 1, titleEN: 1, titleKR: 1, image: 1, type: 1, target: 1, _id: 0 });
        if (advertisement === null || advertisement === void 0 ? void 0 : advertisement.image)
            advertisement.image = this.awsService.getUrl(advertisement.image);
        return advertisement;
    }
    async update(id, updateAdvertisementInput) {
        if (updateAdvertisementInput === null || updateAdvertisementInput === void 0 ? void 0 : updateAdvertisementInput.image) {
            const { image } = await this.AdvertisementsModel.findOne({ _id: updateAdvertisementInput.id }, { image: 1, _id: 0 });
            this.awsService.removeImage(image);
        }
        await this.AdvertisementsModel.findByIdAndUpdate(id, updateAdvertisementInput);
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
        const { image } = await this.AdvertisementsModel.findOne({ _id: id }, { image: 1, _id: 0 });
        await this.AdvertisementsModel.findByIdAndDelete(id);
        this.awsService.removeImage(image);
        return "Success";
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