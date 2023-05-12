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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_service_1 = require("../aws/aws.service");
let CategoriesService = class CategoriesService {
    constructor(CategoriesModel, awsService) {
        this.CategoriesModel = CategoriesModel;
        this.awsService = awsService;
    }
    async create(createCategoryInput, file) {
        if (!file)
            return new common_1.BadRequestException("image required");
        const position = await this.CategoriesModel.countDocuments();
        const category = new this.CategoriesModel(Object.assign(Object.assign({}, createCategoryInput), { position }));
        const result = await this.awsService.createImage(file, category._id);
        category.image = result === null || result === void 0 ? void 0 : result.Key;
        await category.save();
        category.image = this.awsService.getUrl(result === null || result === void 0 ? void 0 : result.Key);
        return category;
    }
    async findAll() {
        const categories = await this.CategoriesModel.find();
        for (const single of categories) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return categories;
    }
    async findCategories() {
        const categories = await this.CategoriesModel.find({ state: "Active" }, { title: 1, titleEN: 1, titleKR: 1, image: 1 });
        for (const single of categories) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return categories;
    }
    async findOne(id) {
        const category = await this.CategoriesModel.findById(id);
        if (category === null || category === void 0 ? void 0 : category.image)
            category.image = this.awsService.getUrl(category.image);
        return category;
    }
    async findCategory(id) {
        const category = await this.CategoriesModel.findOne({ $and: [{ _id: id }, { state: "Active" }] }, { title: 1, titleEN: 1, titleKR: 1, image: 1 });
        if (category === null || category === void 0 ? void 0 : category.image)
            category.image = this.awsService.getUrl(category.image);
        return category;
    }
    async update(id, updateCategoryInput) {
        if (updateCategoryInput === null || updateCategoryInput === void 0 ? void 0 : updateCategoryInput.image) {
            const { image } = await this.CategoriesModel.findOne({ _id: updateCategoryInput.id }, { image: 1, _id: 0 });
            this.awsService.removeImage(image);
        }
        await this.CategoriesModel.findByIdAndUpdate(id, updateCategoryInput);
        return "Success";
    }
    async state(stateInput) {
        await this.CategoriesModel.findByIdAndUpdate(stateInput.id, stateInput);
        return "Success";
    }
    async position(updatePositionInput) {
        for (const single of updatePositionInput) {
            await this.CategoriesModel.findByIdAndUpdate(single.id, { position: single.position });
        }
        return "success";
    }
    async remove(id) {
        const { image } = await this.CategoriesModel.findOne({ _id: id }, { image: 1, _id: 0 });
        await this.CategoriesModel.findByIdAndDelete(id);
        this.awsService.removeImage(image);
        return "Success";
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Categories")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map