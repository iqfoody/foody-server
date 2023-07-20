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
exports.RestaurantCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const meals_service_1 = require("../meals/meals.service");
let RestaurantCategoriesService = class RestaurantCategoriesService {
    RestaurantCategoriesModel;
    mealsService;
    constructor(RestaurantCategoriesModel, mealsService) {
        this.RestaurantCategoriesModel = RestaurantCategoriesModel;
        this.mealsService = mealsService;
    }
    async findForRestaurant(restaurant) {
        let result = [];
        const categories = await this.RestaurantCategoriesModel.find({ restaurant }).select(['-__v', '-position', '-restaurant']);
        for (const single of categories) {
            const meals = await this.mealsService.findForRestaurantCategory(single._id);
            const { _doc: restCategory } = single;
            result.push({ ...restCategory, meals });
        }
        return result;
    }
    create(createRestaurantCategoryInput) {
        return this.RestaurantCategoriesModel.create(createRestaurantCategoryInput);
    }
    findAll(restaurant) {
        return this.RestaurantCategoriesModel.find({ restaurant });
    }
    findOne(id) {
        return this.RestaurantCategoriesModel.findById(id);
    }
    async update(id, updateRestaurantCategoryInput) {
        await this.RestaurantCategoriesModel.findByIdAndUpdate(id, updateRestaurantCategoryInput);
        return "Success";
    }
    async position(updatePositionInput) {
        for (const single of updatePositionInput) {
            await this.RestaurantCategoriesModel.findByIdAndUpdate(single.id, { position: single.position });
        }
        return "success";
    }
    async remove(id) {
        await this.RestaurantCategoriesModel.findByIdAndDelete(id);
        return "Success";
    }
    async clean(id) {
        await this.RestaurantCategoriesModel.deleteMany({ restaurant: id });
        return "Success";
    }
};
RestaurantCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("RestaurantCategories")),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => meals_service_1.MealsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        meals_service_1.MealsService])
], RestaurantCategoriesService);
exports.RestaurantCategoriesService = RestaurantCategoriesService;
//# sourceMappingURL=restaurant-categories.service.js.map