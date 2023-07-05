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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_service_1 = require("../aws/aws.service");
const restaurant_categories_service_1 = require("../restaurant-categories/restaurant-categories.service");
const meals_service_1 = require("../meals/meals.service");
let RestaurantsService = class RestaurantsService {
    RestaurantsModel;
    mealsService;
    restaurantCategoriesService;
    awsService;
    constructor(RestaurantsModel, mealsService, restaurantCategoriesService, awsService) {
        this.RestaurantsModel = RestaurantsModel;
        this.mealsService = mealsService;
        this.restaurantCategoriesService = restaurantCategoriesService;
        this.awsService = awsService;
    }
    async findRestaurnats() {
        const restaurants = await this.RestaurantsModel.find({ state: "Active" }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt']);
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return restaurants;
    }
    async findRestaurnatsInfinty(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.limit;
        const total = await this.RestaurantsModel.countDocuments({ state: "Active" });
        const restaurants = await this.RestaurantsModel.find({ state: "Active" }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt']).limit(limitEntity.limit).skip(skipIndex).sort({ position: -1 });
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { data: restaurants, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findRestaurant(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't restaurant with this id");
        const restaurant = await this.RestaurantsModel.findOne({ $and: [{ _id: id }, { state: "Active" }] }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt']);
        if (!restaurant)
            return;
        const categories = await this.restaurantCategoriesService.findForRestaurant(restaurant._id);
        const meals = await this.mealsService.findForRestaurant(restaurant._id);
        const { _doc: restRestaurant } = restaurant;
        if (restRestaurant?.image)
            restRestaurant.image = this.awsService.getUrl(restRestaurant.image);
        return { ...restRestaurant, categories, meals };
    }
    async searchRestaurant(query) {
        const search = new RegExp(query, 'i');
        const restaurants = await this.RestaurantsModel.find({ $and: [{ $or: [{ title: search }, { titleEN: search }, { description: search }, { descriptionEN: search }] }, { state: "Active" }] }).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position']);
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return restaurants;
    }
    async create(createRestaurantInput) {
        if (!createRestaurantInput?.image)
            return new common_1.BadRequestException("image required");
        const position = await this.RestaurantsModel.countDocuments();
        const restaurant = new this.RestaurantsModel({ ...createRestaurantInput, position });
        const result = await this.awsService.createImage(createRestaurantInput.image, restaurant._id);
        restaurant.image = result?.Key;
        await restaurant.save();
        restaurant.image = this.awsService.getUrl(result?.Key);
        return restaurant;
    }
    async findAll() {
        const restaurants = await this.RestaurantsModel.find();
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return restaurants;
    }
    async findOne(id) {
        const restaurant = await this.RestaurantsModel.findById(id);
        if (restaurant?.image)
            restaurant.image = this.awsService.getUrl(restaurant.image);
        return restaurant;
    }
    async update(id, updateRestaurantInput) {
        if (updateRestaurantInput?.image) {
            const { image } = await this.RestaurantsModel.findOne({ _id: updateRestaurantInput.id }, { image: 1, _id: 0 });
            this.awsService.removeImage(image);
            const result = await this.awsService.createImage(updateRestaurantInput.image, id);
            await this.RestaurantsModel.findByIdAndUpdate(id, { ...updateRestaurantInput, image: result?.Key });
        }
        else {
            await this.RestaurantsModel.findByIdAndUpdate(id, updateRestaurantInput);
        }
        return "Success";
    }
    async state(stateInput) {
        await this.RestaurantsModel.findByIdAndUpdate(stateInput.id, stateInput);
        return "Success";
    }
    async position(updatePositionInput) {
        for (const single of updatePositionInput) {
            await this.RestaurantsModel.findByIdAndUpdate(single.id, { position: single.position });
        }
        return "success";
    }
    async remove(id) {
        const { image } = await this.RestaurantsModel.findOne({ _id: id }, { image: 1, _id: 0 });
        await this.RestaurantsModel.findByIdAndDelete(id);
        await this.restaurantCategoriesService.clean(id);
        this.awsService.removeImage(image);
        return "Success";
    }
    async search(query) {
        const search = new RegExp(query, 'i');
        const restaurants = await this.RestaurantsModel.find({ $and: [{ $or: [{ title: search }, { titleEN: search }, { description: search }, { descriptionEN: search }] }, { state: "Active" }] }).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position']);
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return restaurants;
    }
    getDeliveryPrice(_id) {
        return this.RestaurantsModel.findOne({ $and: [{ _id }, { state: "Active" }] }, { deliveryPrice: 1, _id: 0 });
    }
    findRating(_id) {
        return this.RestaurantsModel.findOne({ $and: [{ _id }, { state: "Active" }] }, { rates: 1, rating: 1, _id: 0 });
    }
    async home() {
        return this.RestaurantsModel.countDocuments();
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Restaurants")),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => meals_service_1.MealsService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => restaurant_categories_service_1.RestaurantCategoriesService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        meals_service_1.MealsService,
        restaurant_categories_service_1.RestaurantCategoriesService,
        aws_service_1.AwsService])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map