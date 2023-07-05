"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversModule = void 0;
const common_1 = require("@nestjs/common");
const drivers_service_1 = require("./drivers.service");
const drivers_resolver_1 = require("./drivers.resolver");
const drivers_controller_1 = require("./drivers.controller");
const mongoose_1 = require("@nestjs/mongoose");
const drivers_schema_1 = require("../models/drivers.schema");
const aws_module_1 = require("../aws/aws.module");
const wallets_module_1 = require("../wallets/wallets.module");
const firebase_module_1 = require("../firebase/firebase.module");
let DriversModule = class DriversModule {
};
DriversModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Drivers", schema: drivers_schema_1.DriversSchema },]),
            (0, common_1.forwardRef)(() => wallets_module_1.WalletsModule),
            aws_module_1.AwsModule,
            firebase_module_1.FirebaseModule,
        ],
        providers: [drivers_resolver_1.DriversResolver, drivers_service_1.DriversService],
        exports: [drivers_service_1.DriversService],
        controllers: [drivers_controller_1.DriversController]
    })
], DriversModule);
exports.DriversModule = DriversModule;
//# sourceMappingURL=drivers.module.js.map