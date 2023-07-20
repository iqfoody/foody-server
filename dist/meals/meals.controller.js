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
exports.MealsController = void 0;
const common_1 = require("@nestjs/common");
const meals_service_1 = require("./meals.service");
let MealsController = class MealsController {
    mealsService;
    constructor(mealsService) {
        this.mealsService = mealsService;
    }
    async getMealsInfinty(limit, page, orderBy) {
        return this.mealsService.findMealsInfinty({ limit, page, orderBy });
    }
    async getRestaurants(restaurant) {
        return this.mealsService.findForRestaurant(restaurant);
    }
    async getrestaurantCategory(restaurantCategory) {
        return this.mealsService.findForRestaurantCategory(restaurantCategory);
    }
    async getMeal(id) {
        return this.mealsService.findMeal(id);
    }
};
__decorate([
    (0, common_1.Get)('/main'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('orderBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "getMealsInfinty", null);
__decorate([
    (0, common_1.Get)('/restaurant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "getRestaurants", null);
__decorate([
    (0, common_1.Get)('/restaurantCategory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "getrestaurantCategory", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "getMeal", null);
MealsController = __decorate([
    (0, common_1.Controller)('meals'),
    __metadata("design:paramtypes", [meals_service_1.MealsService])
], MealsController);
exports.MealsController = MealsController;
//# sourceMappingURL=meals.controller.js.map