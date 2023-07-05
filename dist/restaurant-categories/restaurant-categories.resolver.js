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
exports.RestaurantCategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const restaurant_categories_service_1 = require("./restaurant-categories.service");
const restaurant_category_entity_1 = require("./entities/restaurant-category.entity");
const create_restaurant_category_input_1 = require("./dto/create-restaurant-category.input");
const update_restaurant_category_input_1 = require("./dto/update-restaurant-category.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const position_input_1 = require("../constants/position.input");
const mongoose_1 = require("mongoose");
let RestaurantCategoriesResolver = class RestaurantCategoriesResolver {
    restaurantCategoriesService;
    constructor(restaurantCategoriesService) {
        this.restaurantCategoriesService = restaurantCategoriesService;
    }
    createRestaurantCategory(createRestaurantCategoryInput) {
        return this.restaurantCategoriesService.create(createRestaurantCategoryInput);
    }
    findAll(id) {
        return this.restaurantCategoriesService.findAll(id);
    }
    findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't restaurant category with this id");
        return this.restaurantCategoriesService.findOne(id);
    }
    updateRestaurantCategory(updateRestaurantCategoryInput) {
        if (!(0, mongoose_1.isValidObjectId)(updateRestaurantCategoryInput?.id))
            throw new common_1.BadRequestException("There isn't restaurant category with this id");
        return this.restaurantCategoriesService.update(updateRestaurantCategoryInput.id, updateRestaurantCategoryInput);
    }
    positionRestaurantCategory(updatePositionInput) {
        return this.restaurantCategoriesService.position(updatePositionInput);
    }
    removeRestaurantCategory(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't restaurant category with this id");
        return this.restaurantCategoriesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => restaurant_category_entity_1.RestaurantCategory),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: "Restaurant" }),
    __param(0, (0, graphql_1.Args)('createRestaurantCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_category_input_1.CreateRestaurantCategoryInput]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesResolver.prototype, "createRestaurantCategory", null);
__decorate([
    (0, graphql_1.Query)(() => [restaurant_category_entity_1.RestaurantCategory], { name: 'restaurantCategories' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Restaurant" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => restaurant_category_entity_1.RestaurantCategory, { name: 'restaurantCategory' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Restaurant" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Restaurant" }),
    __param(0, (0, graphql_1.Args)('updateRestaurantCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_restaurant_category_input_1.UpdateRestaurantCategoryInput]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesResolver.prototype, "updateRestaurantCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Restaurant" }),
    __param(0, (0, graphql_1.Args)('updatePositionInput', { type: () => [position_input_1.UpdatePositionInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesResolver.prototype, "positionRestaurantCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: "Restaurant" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesResolver.prototype, "removeRestaurantCategory", null);
RestaurantCategoriesResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => restaurant_category_entity_1.RestaurantCategory),
    __metadata("design:paramtypes", [restaurant_categories_service_1.RestaurantCategoriesService])
], RestaurantCategoriesResolver);
exports.RestaurantCategoriesResolver = RestaurantCategoriesResolver;
//# sourceMappingURL=restaurant-categories.resolver.js.map