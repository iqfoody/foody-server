"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
const settings_resolver_1 = require("./settings.resolver");
const settings_controller_1 = require("./settings.controller");
const mongoose_1 = require("@nestjs/mongoose");
const settings_schema_1 = require("../models/settings.schema");
let SettingsModule = class SettingsModule {
};
SettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Settings", schema: settings_schema_1.SettingsSchema }]),
        ],
        providers: [settings_resolver_1.SettingsResolver, settings_service_1.SettingsService],
        exports: [settings_service_1.SettingsService],
        controllers: [settings_controller_1.SettingsController]
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map