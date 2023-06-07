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
exports.FeedbacksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const feedbacks_service_1 = require("./feedbacks.service");
const feedback_entity_1 = require("./entities/feedback.entity");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const limitEntity_1 = require("../constants/limitEntity");
const feedbacks_limit_entity_1 = require("./entities/feedbacks-limit.entity");
let FeedbacksResolver = class FeedbacksResolver {
    feedbacksService;
    constructor(feedbacksService) {
        this.feedbacksService = feedbacksService;
    }
    findAll(limitEntity) {
        return this.feedbacksService.findAll(limitEntity);
    }
    findOne(id) {
        return this.feedbacksService.findOne(id);
    }
    removeFeedback(id) {
        return this.feedbacksService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => feedbacks_limit_entity_1.FeedbacksLimit, { name: 'feedbacks' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: feedback_entity_1.Feedback }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], FeedbacksResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => feedback_entity_1.Feedback, { name: 'feedback' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: feedback_entity_1.Feedback }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeedbacksResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: feedback_entity_1.Feedback }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeedbacksResolver.prototype, "removeFeedback", null);
FeedbacksResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => feedback_entity_1.Feedback),
    __metadata("design:paramtypes", [feedbacks_service_1.FeedbacksService])
], FeedbacksResolver);
exports.FeedbacksResolver = FeedbacksResolver;
//# sourceMappingURL=feedbacks.resolver.js.map