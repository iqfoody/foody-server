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
const aws_service_1 = require("../aws/aws.service");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const platform_express_1 = require("@nestjs/platform-express");
const update_meal_input_1 = require("./dto/update-meal.input");
const meal_entity_1 = require("./entities/meal.entity");
let MealsController = class MealsController {
    mealsService;
    awsService;
    constructor(mealsService, awsService) {
        this.mealsService = mealsService;
        this.awsService = awsService;
    }
    async getMeal(id) {
        return this.mealsService.findMeal(id);
    }
    async getMealsInfinty() {
        return this.mealsService.findMealsInfinty({ limit: 10, page: 0 });
    }
    async getRestaurants(restaurant) {
        return this.mealsService.findForRestaurant(restaurant);
    }
    async getTags(tag) {
        return this.mealsService.findForTag(tag);
    }
    async getrestaurantCategory(restaurantCategory) {
        return this.mealsService.findForRestaurantCategory(restaurantCategory);
    }
    async createMeal(id, file) {
        const result = await this.awsService.createImage(file, id);
        return this.mealsService.createImage(id, result?.Key);
    }
    async updateMeal(updateMealInput, file) {
        const result = await this.awsService.createImage(file, updateMealInput.id);
        return this.mealsService.update(updateMealInput.id, { ...updateMealInput, image: result?.Key });
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "getMeal", null);
__decorate([
    (0, common_1.Get)('/main'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
    (0, common_1.Get)('/tag/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "getTags", null);
__decorate([
    (0, common_1.Get)('/restaurantCategory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "getrestaurantCategory", null);
__decorate([
    (0, common_1.Post)('/:id'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: meal_entity_1.Meal }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "createMeal", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: meal_entity_1.Meal }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_meal_input_1.UpdateMealInput, Object]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "updateMeal", null);
MealsController = __decorate([
    (0, common_1.Controller)('meals'),
    __metadata("design:paramtypes", [meals_service_1.MealsService,
        aws_service_1.AwsService])
], MealsController);
exports.MealsController = MealsController;
//# sourceMappingURL=meals.controller.js.map