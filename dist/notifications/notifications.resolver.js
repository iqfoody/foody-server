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
exports.NotificationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const notifications_service_1 = require("./notifications.service");
const notification_entity_1 = require("./entities/notification.entity");
const create_notification_input_1 = require("./dto/create-notification.input");
const limitEntity_1 = require("../constants/limitEntity");
const notificationsResponse_entity_1 = require("./entities/notificationsResponse.entity");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const mongoose_1 = require("mongoose");
let NotificationsResolver = class NotificationsResolver {
    notificationsService;
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    createNotification(createNotificationInput) {
        return this.notificationsService.create(createNotificationInput);
    }
    findAll(limitEntity) {
        return this.notificationsService.findAll(limitEntity);
    }
    findManagement(limitEntity) {
        return this.notificationsService.findManagement(limitEntity);
    }
    findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't notification with this id");
        return this.notificationsService.findOne(id);
    }
    removeNotification(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't notification with this id");
        return this.notificationsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => notification_entity_1.Notification),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: "Notification" }),
    __param(0, (0, graphql_1.Args)('createNotificationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_input_1.CreateNotificationInput]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "createNotification", null);
__decorate([
    (0, graphql_1.Query)(() => notificationsResponse_entity_1.NotificationsResponse, { name: 'notifications' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Notification" }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => notificationsResponse_entity_1.NotificationsResponse, { name: 'managementNotifications' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Notification" }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "findManagement", null);
__decorate([
    (0, graphql_1.Query)(() => notification_entity_1.Notification, { name: 'notification' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Notification" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_entity_1.Notification),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: "Notification" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "removeNotification", null);
NotificationsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => notification_entity_1.Notification),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsResolver);
exports.NotificationsResolver = NotificationsResolver;
//# sourceMappingURL=notifications.resolver.js.map