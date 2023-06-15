"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("./notifications.service");
const notifications_resolver_1 = require("./notifications.resolver");
const notifications_controller_1 = require("./notifications.controller");
const firebase_module_1 = require("../firebase/firebase.module");
const aws_module_1 = require("../aws/aws.module");
const mongoose_1 = require("@nestjs/mongoose");
const notifications_schema_1 = require("../models/notifications.schema");
const meals_module_1 = require("../meals/meals.module");
const restaurants_module_1 = require("../restaurants/restaurants.module");
const users_module_1 = require("../users/users.module");
const drivers_module_1 = require("../drivers/drivers.module");
const orders_module_1 = require("../orders/orders.module");
const admins_module_1 = require("../admins/admins.module");
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Notifications", schema: notifications_schema_1.NotificationsSchema }]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => drivers_module_1.DriversModule),
            (0, common_1.forwardRef)(() => admins_module_1.AdminsModule),
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            (0, common_1.forwardRef)(() => meals_module_1.MealsModule),
            (0, common_1.forwardRef)(() => restaurants_module_1.RestaurantsModule),
            aws_module_1.AwsModule,
            firebase_module_1.FirebaseModule
        ],
        providers: [notifications_resolver_1.NotificationsResolver, notifications_service_1.NotificationsService],
        exports: [notifications_service_1.NotificationsService],
        controllers: [notifications_controller_1.NotificationsController]
    })
], NotificationsModule);
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map