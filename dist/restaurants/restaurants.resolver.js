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
exports.RestaurantsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const restaurants_service_1 = require("./restaurants.service");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const create_restaurant_input_1 = require("./dto/create-restaurant.input");
const update_restaurant_input_1 = require("./dto/update-restaurant.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const state_input_1 = require("../constants/state.input");
const position_input_1 = require("../constants/position.input");
let RestaurantsResolver = class RestaurantsResolver {
    restaurantsService;
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    createRestaurant(createRestaurantInput) {
        return this.restaurantsService.create(createRestaurantInput, null);
    }
    findAll() {
        return this.restaurantsService.findAll();
    }
    search(query) {
        return this.restaurantsService.search(query);
    }
    findOne(id) {
        return this.restaurantsService.findOne(id);
    }
    updateRestaurant(updateRestaurantInput) {
        return this.restaurantsService.update(updateRestaurantInput.id, updateRestaurantInput);
    }
    stateRestaurant(stateInput) {
        return this.restaurantsService.state(stateInput);
    }
    positionRestaurant(updatePositionInput) {
        return this.restaurantsService.position(updatePositionInput);
    }
    removeRestaurant(id) {
        return this.restaurantsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => restaurant_entity_1.Restaurant),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: restaurant_entity_1.Restaurant }),
    __param(0, (0, graphql_1.Args)('createRestaurantInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_input_1.CreateRestaurantInput]),
    __metadata("design:returntype", void 0)
], RestaurantsResolver.prototype, "createRestaurant", null);
__decorate([
    (0, graphql_1.Query)(() => [restaurant_entity_1.Restaurant], { name: 'restaurants' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: restaurant_entity_1.Restaurant }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RestaurantsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => [restaurant_entity_1.Restaurant], { name: 'searchRestaurants' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: restaurant_entity_1.Restaurant }),
    __param(0, (0, graphql_1.Args)('query', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsResolver.prototype, "search", null);
__decorate([
    (0, graphql_1.Query)(() => restaurant_entity_1.Restaurant, { name: 'restaurant' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: restaurant_entity_1.Restaurant }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: restaurant_entity_1.Restaurant }),
    __param(0, (0, graphql_1.Args)('updateRestaurantInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_restaurant_input_1.UpdateRestaurantInput]),
    __metadata("design:returntype", void 0)
], RestaurantsResolver.prototype, "updateRestaurant", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: restaurant_entity_1.Restaurant }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", void 0)
], RestaurantsResolver.prototype, "stateRestaurant", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: restaurant_entity_1.Restaurant }),
    __param(0, (0, graphql_1.Args)('updatePositionInput', { type: () => [position_input_1.UpdatePositionInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], RestaurantsResolver.prototype, "positionRestaurant", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: restaurant_entity_1.Restaurant }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsResolver.prototype, "removeRestaurant", null);
RestaurantsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => restaurant_entity_1.Restaurant),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsResolver);
exports.RestaurantsResolver = RestaurantsResolver;
//# sourceMappingURL=restaurants.resolver.js.map