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
let FeedbacksService = class FeedbacksService {
    FeedbacksModel;
    constructor(FeedbacksModel) {
        this.FeedbacksModel = FeedbacksModel;
    }
    async create(createFeedbackInput) {
        await this.FeedbacksModel.create(createFeedbackInput);
        return "Success";
    }
    async findAll(limitEntity) {
        const startIndex = limitEntity.page * limitEntity.limit;
        const feedbacks = await this.FeedbacksModel.find().limit(limitEntity.limit).skip(startIndex).sort({ _id: -1 });
        const total = await this.FeedbacksModel.countDocuments();
        return { data: feedbacks, pages: Math.ceil(total / limitEntity.limit) };
    }
    findOne(id) {
        return this.FeedbacksModel.findById(id);
    }
    async remove(id) {
        await this.FeedbacksModel.findByIdAndDelete(id);
        return "Success";
    }
};
FeedbacksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Feedbacks")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FeedbacksService);
exports.FeedbacksService = FeedbacksService;
//# sourceMappingURL=feedbacks.service.js.map