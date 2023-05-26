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
exports.FeedbacksController = void 0;
const common_1 = require("@nestjs/common");
const feedbacks_service_1 = require("./feedbacks.service");
const create_feedback_input_1 = require("./dto/create-feedback.input");
let FeedbacksController = class FeedbacksController {
    feedbacksService;
    constructor(feedbacksService) {
        this.feedbacksService = feedbacksService;
    }
    async createFavorite(createFeedbackInput) {
        return this.feedbacksService.create(createFeedbackInput);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)('createFeedbackInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_input_1.CreateFeedbackInput]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "createFavorite", null);
FeedbacksController = __decorate([
    (0, common_1.Controller)('feedbacks'),
    __metadata("design:paramtypes", [feedbacks_service_1.FeedbacksService])
], FeedbacksController);
exports.FeedbacksController = FeedbacksController;
//# sourceMappingURL=feedbacks.controller.js.map