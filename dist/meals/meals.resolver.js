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
const limitEntity_1 = require("../constants/limitEntity");
const state_input_1 = require("../constants/state.input");
const position_input_1 = require("../constants/position.input");
const mealsResponse_entity_1 = require("./entities/mealsResponse.entity");
const create_meal_object_input_1 = require("./dto/create-meal-object.input");
const update_meal_object_input_1 = require("./dto/update-meal-object.input");
const remove_mea_object_input_1 = require("./dto/remove-mea-object.input");
const meal_addition_entity_1 = require("./entities/meal-addition.entity");
const mongoose_1 = require("mongoose");
let MealsResolver = class MealsResolver {
    mealsService;
    constructor(mealsService) {
        this.mealsService = mealsService;
    }
    createMeal(createMealInput) {
        return this.mealsService.create(createMealInput);
    }
    findAll(limitEntity) {
        return this.mealsService.findAll(limitEntity);
    }
    findAllForRestaurant(limitEntity) {
        if (!(0, mongoose_1.isValidObjectId)(limitEntity?.user))
            throw new common_1.BadRequestException("There isn't restaruant with this id");
        return this.mealsService.findAllForRestaurant(limitEntity);
    }
    search(query) {
        return this.mealsService.search(query);
    }
    findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't meal with this id");
        return this.mealsService.findOne(id);
    }
    updateMeal(updateMealInput) {
        if (!(0, mongoose_1.isValidObjectId)(updateMealInput?.id))
            throw new common_1.BadRequestException("There isn't meal with this id");
        return this.mealsService.update(updateMealInput.id, updateMealInput);
    }
    stateMeal(stateInput) {
        if (!(0, mongoose_1.isValidObjectId)(stateInput?.id))
            throw new common_1.BadRequestException("There isn't meal with this id");
        return this.mealsService.state(stateInput);
    }
    positionMeal(updatePositionInput) {
        return this.mealsService.position(updatePositionInput);
    }
    removeMeal(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't meal with this id");
        return this.mealsService.remove(id);
    }
    createMealObject(createMealObject) {
        return this.mealsService.createMealObject(createMealObject);
    }
    updateMealObject(updateMealObject) {
        return this.mealsService.updateMealObject(updateMealObject);
    }
    removeMealObject(removeMealObject) {
        return this.mealsService.removeMealObject(removeMealObject);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => meal_entity_1.Meal),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('createMealInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meal_input_1.CreateMealInput]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "createMeal", null);
__decorate([
    (0, graphql_1.Query)(() => mealsResponse_entity_1.MealsResponse, { name: 'meals' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => mealsResponse_entity_1.MealsResponse, { name: 'mealsRestaurant' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "findAllForRestaurant", null);
__decorate([
    (0, graphql_1.Query)(() => [meal_entity_1.Meal], { name: 'searchMeals' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('query', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "search", null);
__decorate([
    (0, graphql_1.Query)(() => meal_entity_1.Meal, { name: 'meal' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => meal_entity_1.Meal),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('updateMealInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_meal_input_1.UpdateMealInput]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "updateMeal", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "stateMeal", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('updatePositionInput', { type: () => [position_input_1.UpdatePositionInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "positionMeal", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "removeMeal", null);
__decorate([
    (0, graphql_1.Mutation)(() => meal_addition_entity_1.MealAddition),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('createMealObject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meal_object_input_1.CreateMealObject]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "createMealObject", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('updateMealObject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_meal_object_input_1.UpdateMealObject]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "updateMealObject", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Meal" }),
    __param(0, (0, graphql_1.Args)('removeMealObject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_mea_object_input_1.RemoveMealObject]),
    __metadata("design:returntype", void 0)
], MealsResolver.prototype, "removeMealObject", null);
MealsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => meal_entity_1.Meal),
    __metadata("design:paramtypes", [meals_service_1.MealsService])
], MealsResolver);
exports.MealsResolver = MealsResolver;
//# sourceMappingURL=meals.resolver.js.map