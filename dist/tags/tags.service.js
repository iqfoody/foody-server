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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_service_1 = require("../aws/aws.service");
let TagsService = class TagsService {
    TagsModel;
    awsService;
    constructor(TagsModel, awsService) {
        this.TagsModel = TagsModel;
        this.awsService = awsService;
    }
    async findTags() {
        const tags = await this.TagsModel.find({ state: "Active" }, { title: 1, titleEN: 1, titleKR: 1 });
        for (const single of tags) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return tags;
    }
    async findTag(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't tag with this id");
        const tag = await this.TagsModel.findOne({ $and: [{ _id: id }, { state: "Active" }] }, { title: 1, titleEN: 1, titleKR: 1 });
        if (tag?.image)
            tag.image = this.awsService.getUrl(tag.image);
        return tag;
    }
    async create(createTagInput, file) {
        const position = await this.TagsModel.countDocuments();
        const tag = new this.TagsModel({ ...createTagInput, position });
        if (file) {
            const result = await this.awsService.createImage(file, tag._id);
            tag.image = result?.Key;
        }
        await tag.save();
        if (tag?.image)
            tag.image = this.awsService.getUrl(tag.image);
        return tag;
    }
    async findAll() {
        const tags = await this.TagsModel.find();
        for (const single of tags) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return tags;
    }
    async findOne(id) {
        const tag = await this.TagsModel.findById(id);
        if (tag?.image)
            tag.image = this.awsService.getUrl(tag.image);
        return tag;
    }
    async update(id, updateTagInput) {
        if (updateTagInput?.image) {
            const { image } = await this.TagsModel.findOne({ _id: updateTagInput.id }, { image: 1, _id: 0 });
            this.awsService.removeImage(image);
        }
        await this.TagsModel.findByIdAndUpdate(id, updateTagInput);
        return "Success";
    }
    async state(stateInput) {
        await this.TagsModel.findByIdAndUpdate(stateInput.id, stateInput);
        return "Success";
    }
    async position(updatePositionInput) {
        for (const single of updatePositionInput) {
            await this.TagsModel.findByIdAndUpdate(single.id, { position: single.position });
        }
        return "success";
    }
    async remove(id) {
        const { image } = await this.TagsModel.findOne({ _id: id }, { image: 1, _id: 0 });
        await this.TagsModel.findByIdAndDelete(id);
        this.awsService.removeImage(image);
        return "Success";
    }
};
TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Tags")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map