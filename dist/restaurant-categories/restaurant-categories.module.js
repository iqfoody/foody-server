"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const restaurant_categories_service_1 = require("./restaurant-categories.service");
const restaurant_categories_resolver_1 = require("./restaurant-categories.resolver");
const restaurant_categories_controller_1 = require("./restaurant-categories.controller");
const mongoose_1 = require("@nestjs/mongoose");
const restaurantCategories_schema_1 = require("../models/restaurantCategories.schema");
let RestaurantCategoriesModule = class RestaurantCategoriesModule {
};
RestaurantCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "RestaurantCategories", schema: restaurantCategories_schema_1.RestaurantCategoriesSchema }]),
        ],
        providers: [restaurant_categories_resolver_1.RestaurantCategoriesResolver, restaurant_categories_service_1.RestaurantCategoriesService],
        exports: [restaurant_categories_service_1.RestaurantCategoriesService],
        controllers: [restaurant_categories_controller_1.RestaurantCategoriesController]
    })
], RestaurantCategoriesModule);
exports.RestaurantCategoriesModule = RestaurantCategoriesModule;
//# sourceMappingURL=restaurant-categories.module.js.map