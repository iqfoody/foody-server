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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const notifications_service_1 = require("./notifications.service");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const notification_entity_1 = require("./entities/notification.entity");
const platform_express_1 = require("@nestjs/platform-express");
const create_notification_input_1 = require("./dto/create-notification.input");
let NotificationsController = class NotificationsController {
    notificationsService;
    firebaseService;
    constructor(notificationsService, firebaseService) {
        this.notificationsService = notificationsService;
        this.firebaseService = firebaseService;
    }
    async getMealsInfinty(limit, page) {
        const user = '';
        return this.notificationsService.findNotifications({ limit, page, user });
    }
    async createRestaurant(createNotificationInput, file) {
        return this.notificationsService.create(createNotificationInput, file);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getMealsInfinty", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: notification_entity_1.Notification }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_input_1.CreateNotificationInput, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "createRestaurant", null);
NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        firebase_service_1.FirebaseService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map