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
exports.FeedbacksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_service_1 = require("../aws/aws.service");
let FeedbacksService = class FeedbacksService {
    FeedbacksModel;
    awsService;
    constructor(FeedbacksModel, awsService) {
        this.FeedbacksModel = FeedbacksModel;
        this.awsService = awsService;
    }
    async create(createFeedbackInput) {
        await this.FeedbacksModel.create(createFeedbackInput);
        return "Success";
    }
    async findAll(limitEntity) {
        const startIndex = limitEntity.page * limitEntity.limit;
        const feedbacks = await this.FeedbacksModel.find().limit(limitEntity.limit).skip(startIndex).sort({ _id: -1 }).populate({ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } });
        const total = await this.FeedbacksModel.countDocuments();
        for (const single of feedbacks) {
            if (single?.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: feedbacks, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findOne(id) {
        const feedback = await this.FeedbacksModel.findById(id).populate({ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } });
        if (feedback?.user?.image)
            feedback.user.image = this.awsService.getUrl(feedback.user.image);
        return feedback;
    }
    async remove(id) {
        await this.FeedbacksModel.findByIdAndDelete(id);
        return "Success";
    }
};
FeedbacksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Feedbacks")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], FeedbacksService);
exports.FeedbacksService = FeedbacksService;
//# sourceMappingURL=feedbacks.service.js.map