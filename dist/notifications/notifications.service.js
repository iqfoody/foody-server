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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const meals_service_1 = require("../meals/meals.service");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const aws_service_1 = require("../aws/aws.service");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const drivers_service_1 = require("../drivers/drivers.service");
const orders_service_1 = require("../orders/orders.service");
const firebase_service_1 = require("../firebase/firebase.service");
const admins_service_1 = require("../admins/admins.service");
let NotificationsService = class NotificationsService {
    NotificationsModel;
    usersService;
    driversService;
    adminsService;
    ordersService;
    mealsService;
    restaurantsService;
    firebaseService;
    awsService;
    constructor(NotificationsModel, usersService, driversService, adminsService, ordersService, mealsService, restaurantsService, firebaseService, awsService) {
        this.NotificationsModel = NotificationsModel;
        this.usersService = usersService;
        this.driversService = driversService;
        this.adminsService = adminsService;
        this.ordersService = ordersService;
        this.mealsService = mealsService;
        this.restaurantsService = restaurantsService;
        this.firebaseService = firebaseService;
        this.awsService = awsService;
    }
    async findNotifications(limitEntity) {
        const { _id } = await this.usersService.findId(limitEntity?.user);
        const startIndex = limitEntity.limit * limitEntity.page;
        const notifications = await this.NotificationsModel.find({ $or: [{ type: "Public" }, { user: _id }] }).limit(limitEntity.limit).skip(startIndex).sort({ _id: -1 });
        const total = await this.NotificationsModel.countDocuments({ $or: [{ type: "Public" }, { user: _id }] });
        for (const single of notifications) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { data: notifications, pages: Math.ceil(total / limitEntity.limit) };
    }
    async createVertual(createNotificationInput) {
        const notification = await this.NotificationsModel.create(createNotificationInput);
        await this.firebaseService.sendPublicAdmin(notification);
        return "Success";
    }
    async create(createNotificationInput, file) {
        const notification = new this.NotificationsModel(createNotificationInput);
        if (file) {
            const result = await this.awsService.createImage(file, notification._id);
            notification.image = result?.Key;
        }
        await notification.save();
        if (notification.image)
            notification.image = this.awsService.getUrl(notification.image);
        const finalResult = await notification.populate("user");
        if (finalResult.user?.image)
            finalResult.user.image = this.awsService.getUrl(finalResult.user.image);
        if (createNotificationInput.type === "Private" && createNotificationInput?.user) {
            const user = await this.usersService.findDeviceToken(createNotificationInput.user);
            if (user?.deviceToken)
                await this.firebaseService.sendPrivate(finalResult, user.deviceToken);
        }
        else {
            await this.firebaseService.sendPublic(finalResult);
        }
        return finalResult;
    }
    async findAll(limitEntity) {
        const startIndex = limitEntity.limit * limitEntity.page;
        const notifications = await this.NotificationsModel.find({ $and: [{ type: { $ne: "Vertual" } }, { type: { $ne: "Management" } }] }).limit(limitEntity.limit).skip(startIndex).sort({ _id: -1 }).populate("user");
        const total = await this.NotificationsModel.countDocuments({ $and: [{ type: { $ne: "Vertual" } }, { type: { $ne: "Management" } }] });
        for (const single of notifications) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: notifications, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findManagement(limitEntity) {
        const startIndex = limitEntity.limit * limitEntity.page;
        const notifications = await this.NotificationsModel.find({ type: "Management" }).limit(limitEntity.limit).skip(startIndex).sort({ _id: -1 }).populate("user");
        const total = await this.NotificationsModel.countDocuments({ type: "Management" });
        for (const single of notifications) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { data: notifications, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findOne(id) {
        const notification = await this.NotificationsModel.findById(id).populate("user");
        if (notification.user?.image)
            notification.user.image = this.awsService.getUrl(notification.user.image);
        if (notification?.image)
            notification.image = this.awsService.getUrl(notification.image);
        return notification;
    }
    async update(id, updateNotificationInput) {
        await this.NotificationsModel.findByIdAndUpdate(id);
        return "Success";
    }
    async remove(id) {
        const { image } = await this.NotificationsModel.findOne({ _id: id }, { image: 1, _id: 0 });
        await this.NotificationsModel.findByIdAndDelete(id);
        if (image)
            this.awsService.removeImage(image);
        return "Success";
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Notifications")),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => drivers_service_1.DriversService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => admins_service_1.AdminsService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => orders_service_1.OrdersService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => meals_service_1.MealsService))),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => restaurants_service_1.RestaurantsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        drivers_service_1.DriversService,
        admins_service_1.AdminsService,
        orders_service_1.OrdersService,
        meals_service_1.MealsService,
        restaurants_service_1.RestaurantsService,
        firebase_service_1.FirebaseService,
        aws_service_1.AwsService])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map