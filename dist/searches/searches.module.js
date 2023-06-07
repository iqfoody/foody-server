"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchesModule = void 0;
const common_1 = require("@nestjs/common");
const searches_service_1 = require("./searches.service");
const searches_resolver_1 = require("./searches.resolver");
const searches_controller_1 = require("./searches.controller");
const meals_module_1 = require("../meals/meals.module");
const restaurants_module_1 = require("../restaurants/restaurants.module");
const users_module_1 = require("../users/users.module");
let SearchesModule = class SearchesModule {
};
SearchesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => meals_module_1.MealsModule),
            (0, common_1.forwardRef)(() => restaurants_module_1.RestaurantsModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        providers: [searches_resolver_1.SearchesResolver, searches_service_1.SearchesService],
        exports: [searches_service_1.SearchesService],
        controllers: [searches_controller_1.SearchesController]
    })
], SearchesModule);
exports.SearchesModule = SearchesModule;
//# sourceMappingURL=searches.module.js.map