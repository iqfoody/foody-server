"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchesController = void 0;
const common_1 = require("@nestjs/common");
const meals_service_1 = require("../meals/meals.service");
const restaurants_service_1 = require("../restaurants/restaurants.service");
let SearchesController = class SearchesController {
    restaurantsService;
    mealsService;
    constructor(restaurantsService, mealsService) {
        this.restaurantsService = restaurantsService;
        this.mealsService = mealsService;
    }
    async search(query) {
        if (!query || query?.length < 2 || query?.length >= 15)
            return;
        const restaurants = await this.restaurantsService.search(query);
        const meals = await this.mealsService.search(query);
        return [...restaurants, ...meals];
    }
};
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchesController.prototype, "search", null);
SearchesController = __decorate([
    (0, common_1.Controller)('searches'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService,
        meals_service_1.MealsService])
], SearchesController);
exports.SearchesController = SearchesController;
//# sourceMappingURL=searches.controller.js.map