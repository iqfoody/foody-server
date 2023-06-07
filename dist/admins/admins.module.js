"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsModule = void 0;
const common_1 = require("@nestjs/common");
const admins_service_1 = require("./admins.service");
const admins_resolver_1 = require("./admins.resolver");
const admins_controller_1 = require("./admins.controller");
const mongoose_1 = require("@nestjs/mongoose");
const admins_schema_1 = require("../models/admins.schema");
const aws_module_1 = require("../aws/aws.module");
const wallets_module_1 = require("../wallets/wallets.module");
let AdminsModule = class AdminsModule {
};
AdminsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Admins", schema: admins_schema_1.AdminsSchema },]),
            (0, common_1.forwardRef)(() => wallets_module_1.WalletsModule),
            aws_module_1.AwsModule,
        ],
        providers: [admins_resolver_1.AdminsResolver, admins_service_1.AdminsService],
        exports: [admins_service_1.AdminsService],
        controllers: [admins_controller_1.AdminsController]
    })
], AdminsModule);
exports.AdminsModule = AdminsModule;
//# sourceMappingURL=admins.module.js.map