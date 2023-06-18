"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesModule = void 0;
const common_1 = require("@nestjs/common");
const addresses_service_1 = require("./addresses.service");
const addresses_resolver_1 = require("./addresses.resolver");
const addresses_controller_1 = require("./addresses.controller");
const mongoose_1 = require("@nestjs/mongoose");
const addresses_schema_1 = require("../models/addresses.schema");
const users_module_1 = require("../users/users.module");
const firebase_module_1 = require("../firebase/firebase.module");
let AddressesModule = class AddressesModule {
};
AddressesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Addresses", schema: addresses_schema_1.AddressesSchema }]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            firebase_module_1.FirebaseModule
        ],
        providers: [addresses_resolver_1.AddressesResolver, addresses_service_1.AddressesService],
        exports: [addresses_service_1.AddressesService],
        controllers: [addresses_controller_1.AddressesController]
    })
], AddressesModule);
exports.AddressesModule = AddressesModule;
//# sourceMappingURL=addresses.module.js.map