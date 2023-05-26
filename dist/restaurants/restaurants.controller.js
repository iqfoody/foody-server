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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("./restaurants.service");
const aws_service_1 = require("../aws/aws.service");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const platform_express_1 = require("@nestjs/platform-express");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const create_restaurant_input_1 = require("./dto/create-restaurant.input");
const update_restaurant_input_1 = require("./dto/update-restaurant.input");
let RestaurantsController = class RestaurantsController {
    restaurantsService;
    awsService;
    constructor(restaurantsService, awsService) {
        this.restaurantsService = restaurantsService;
        this.awsService = awsService;
    }
    async getRestaurant(restaurant) {
        return this.restaurantsService.findRestaurant(restaurant);
    }
    async getRestaurants() {
        return this.restaurantsService.findRestaurnats();
    }
    async getRestaurantsInfinty(limit, page) {
        return this.restaurantsService.findRestaurnatsInfinty({ limit, page });
    }
    async getRestaurantsForCategory(category, orderby) {
        return this.restaurantsService.findForCategory(category, orderby);
    }
    async createRestaurant(createRestaurantInput, file) {
        return this.restaurantsService.create(createRestaurantInput, file);
    }
    async updateRestaurant(updateRestaurantInput, file) {
        const result = await this.awsService.createImage(file, updateRestaurantInput.id);
        return this.restaurantsService.update(updateRestaurantInput.id, { ...updateRestaurantInput, image: result?.Key });
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getRestaurant", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getRestaurants", null);
__decorate([
    (0, common_1.Get)('/main'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getRestaurantsInfinty", null);
__decorate([
    (0, common_1.Get)('/category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('orderBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getRestaurantsForCategory", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: restaurant_entity_1.Restaurant }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_input_1.CreateRestaurantInput, Object]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "createRestaurant", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: restaurant_entity_1.Restaurant }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_restaurant_input_1.UpdateRestaurantInput, Object]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "updateRestaurant", null);
RestaurantsController = __decorate([
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService,
        aws_service_1.AwsService])
], RestaurantsController);
exports.RestaurantsController = RestaurantsController;
//# sourceMappingURL=restaurants.controller.js.map