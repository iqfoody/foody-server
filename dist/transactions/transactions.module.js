"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const transactions_resolver_1 = require("./transactions.resolver");
const transactions_controller_1 = require("./transactions.controller");
const wallets_module_1 = require("../wallets/wallets.module");
const mongoose_1 = require("@nestjs/mongoose");
const transactions_schema_1 = require("../models/transactions.schema");
const admins_module_1 = require("../admins/admins.module");
const users_module_1 = require("../users/users.module");
const aws_module_1 = require("../aws/aws.module");
const orders_module_1 = require("../orders/orders.module");
let TransactionsModule = class TransactionsModule {
};
TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Transactions", schema: transactions_schema_1.TransactionsSchema }]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => admins_module_1.AdminsModule),
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            (0, common_1.forwardRef)(() => wallets_module_1.WalletsModule),
            aws_module_1.AwsModule
        ],
        providers: [transactions_resolver_1.TransactionsResolver, transactions_service_1.TransactionsService],
        exports: [transactions_service_1.TransactionsService],
        controllers: [transactions_controller_1.TransactionsController]
    })
], TransactionsModule);
exports.TransactionsModule = TransactionsModule;
//# sourceMappingURL=transactions.module.js.map