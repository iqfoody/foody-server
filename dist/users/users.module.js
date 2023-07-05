"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_resolver_1 = require("./users.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("../models/users.schema");
const users_controller_1 = require("./users.controller");
const aws_module_1 = require("../aws/aws.module");
const wallets_module_1 = require("../wallets/wallets.module");
const favorites_module_1 = require("../favorites/favorites.module");
const addresses_module_1 = require("../addresses/addresses.module");
const firebase_module_1 = require("../firebase/firebase.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Users", schema: users_schema_1.UsersSchema }]),
            (0, common_1.forwardRef)(() => wallets_module_1.WalletsModule),
            (0, common_1.forwardRef)(() => favorites_module_1.FavoritesModule),
            (0, common_1.forwardRef)(() => addresses_module_1.AddressesModule),
            aws_module_1.AwsModule,
            firebase_module_1.FirebaseModule
        ],
        providers: [users_resolver_1.UsersResolver, users_service_1.UsersService],
        exports: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map