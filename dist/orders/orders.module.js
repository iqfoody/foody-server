"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_resolver_1 = require("./orders.resolver");
const orders_controller_1 = require("./orders.controller");
const mongoose_1 = require("@nestjs/mongoose");
const orders_schema_1 = require("../models/orders.schema");
const meals_module_1 = require("../meals/meals.module");
const aws_module_1 = require("../aws/aws.module");
const promo_codes_module_1 = require("../promo-codes/promo-codes.module");
const wallets_module_1 = require("../wallets/wallets.module");
const users_module_1 = require("../users/users.module");
const rates_module_1 = require("../rates/rates.module");
const restaurants_module_1 = require("../restaurants/restaurants.module");
const drivers_module_1 = require("../drivers/drivers.module");
const transactions_module_1 = require("../transactions/transactions.module");
const firebase_module_1 = require("../firebase/firebase.module");
const notifications_module_1 = require("../notifications/notifications.module");
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Orders", schema: orders_schema_1.OrdersSchema }]),
            (0, common_1.forwardRef)(() => meals_module_1.MealsModule),
            (0, common_1.forwardRef)(() => promo_codes_module_1.PromoCodesModule),
            (0, common_1.forwardRef)(() => wallets_module_1.WalletsModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => rates_module_1.RatesModule),
            (0, common_1.forwardRef)(() => restaurants_module_1.RestaurantsModule),
            (0, common_1.forwardRef)(() => drivers_module_1.DriversModule),
            (0, common_1.forwardRef)(() => transactions_module_1.TransactionsModule),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
            aws_module_1.AwsModule,
            firebase_module_1.FirebaseModule
        ],
        providers: [orders_resolver_1.OrdersResolver, orders_service_1.OrdersService],
        exports: [orders_service_1.OrdersService],
        controllers: [orders_controller_1.OrdersController]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map