"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesModule = void 0;
const common_1 = require("@nestjs/common");
const favorites_service_1 = require("./favorites.service");
const favorites_resolver_1 = require("./favorites.resolver");
const favorites_controller_1 = require("./favorites.controller");
const mongoose_1 = require("@nestjs/mongoose");
const favorites_schema_1 = require("../models/favorites.schema");
let FavoritesModule = class FavoritesModule {
};
FavoritesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Favorites", schema: favorites_schema_1.FavoritesSchema }]),
        ],
        providers: [favorites_resolver_1.FavoritesResolver, favorites_service_1.FavoritesService],
        exports: [favorites_service_1.FavoritesService],
        controllers: [favorites_controller_1.FavoritesController]
    })
], FavoritesModule);
exports.FavoritesModule = FavoritesModule;
//# sourceMappingURL=favorites.module.js.map