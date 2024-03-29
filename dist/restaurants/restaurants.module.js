"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsModule = void 0;
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("./restaurants.service");
const restaurants_resolver_1 = require("./restaurants.resolver");
const restaurants_controller_1 = require("./restaurants.controller");
const mongoose_1 = require("@nestjs/mongoose");
const restaurants_schema_1 = require("../models/restaurants.schema");
const aws_module_1 = require("../aws/aws.module");
const restaurant_categories_module_1 = require("../restaurant-categories/restaurant-categories.module");
const meals_module_1 = require("../meals/meals.module");
let RestaurantsModule = class RestaurantsModule {
};
RestaurantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Restaurants", schema: restaurants_schema_1.RestaurantsSchema }]),
            (0, common_1.forwardRef)(() => meals_module_1.MealsModule),
            (0, common_1.forwardRef)(() => restaurant_categories_module_1.RestaurantCategoriesModule),
            aws_module_1.AwsModule,
        ],
        providers: [restaurants_resolver_1.RestaurantsResolver, restaurants_service_1.RestaurantsService],
        exports: [restaurants_service_1.RestaurantsService],
        controllers: [restaurants_controller_1.RestaurantsController]
    })
], RestaurantsModule);
exports.RestaurantsModule = RestaurantsModule;
//# sourceMappingURL=restaurants.module.js.map