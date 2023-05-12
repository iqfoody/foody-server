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
exports.MealsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const meals_service_1 = require("./meals.service");
const meal_entity_1 = require("./entities/meal.entity");
const create_meal_input_1 = require("./dto/create-meal.input");
const update_meal_input_1 = require("./dto/update-meal.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
let MealsResolver = class MealsResolver {
    constructor(mealsService) {
        this.mealsService = mealsService;
    }
    createMeal(createMealInput) {
        return this.mealsService.create(createMealInput, null);
    }
    findAll() {
        return this.mealsService.findAll();
    }
    findOne(id) {
        return this.mealsService.findOne(id);
    }
    updateMeal(updateMealInput) {
        return this.mealsService.update(updateMealInput.id, updateMealInput);
    }
    removeMeal(id) {
        return this.mealsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => meal_entity_1.Meal),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: meal_entity_1.Meal }),
    __param(0, (0, graphql_1.Args)('createMealInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meal_input_1.CreateMealInput]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "createMeal", null);
__decorate([
    (0, graphql_1.Query)(() => [meal_entity_1.Meal], { name: 'meals' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: meal_entity_1.Meal }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => meal_entity_1.Meal, { name: 'meal' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: meal_entity_1.Meal }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => meal_entity_1.Meal),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: meal_entity_1.Meal }),
    __param(0, (0, graphql_1.Args)('updateMealInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_meal_input_1.UpdateMealInput]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "updateMeal", null);
__decorate([
    (0, graphql_1.Mutation)(() => meal_entity_1.Meal),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: meal_entity_1.Meal }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "removeMeal", null);
MealsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => meal_entity_1.Meal),
    __metadata("design:paramtypes", [meals_service_1.MealsService])
], MealsResolver);
exports.MealsResolver = MealsResolver;
//# sourceMappingURL=meals.resolver.js.map