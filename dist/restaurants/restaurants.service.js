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
let RestaurantsService = class RestaurantsService {
    RestaurantsModel;
    restaurantCategoriesService;
    awsService;
    constructor(RestaurantsModel, restaurantCategoriesService, awsService) {
        this.RestaurantsModel = RestaurantsModel;
        this.restaurantCategoriesService = restaurantCategoriesService;
        this.awsService = awsService;
    }
    async findRestaurnats() {
        const restaurants = await this.RestaurantsModel.find({ state: "Active" }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt']).populate({ path: "category", select: { title: 1, titleEN: 1, titleKR: 1, _id: 0 } });
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return restaurants;
    }
    async findRestaurnatsInfinty(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.limit;
        const total = await this.RestaurantsModel.countDocuments({ state: "Active" });
        const restaurants = await this.RestaurantsModel.find({ state: "Active" }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt']).limit(limitEntity.limit).skip(skipIndex).sort({ position: -1 }).populate({ path: "category", select: { title: 1, titleEN: 1, titleKR: 1, _id: 0 } });
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { data: restaurants, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findForCategory(category, orderBy) {
        if (!(0, mongoose_2.isValidObjectId)(category))
            throw new common_1.BadRequestException("There isn't restaurants with this category id");
        let sort = { position: 1 };
        if (orderBy === 'highestPrice') {
            sort = { price: -1 };
        }
        else if (orderBy === 'lowestPrice') {
            sort = { price: 1 };
        }
        else if (orderBy === 'recently') {
            sort = { _id: -1 };
        }
        const restaurants = await this.RestaurantsModel.find({ $and: [{ category }, { state: "Active" }] }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt', '-category']).sort(sort);
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return restaurants;
    }
    async findRestaurant(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't restaurant with this id");
        const restaurant = await this.RestaurantsModel.findOne({ $and: [{ _id: id }, { state: "Active" }] }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt', '-category']);
        if (restaurant?.image)
            restaurant.image = this.awsService.getUrl(restaurant.image);
        return restaurant;
    }
    async searchRestaurant(query) {
        const restaurants = await this.RestaurantsModel.find({ $and: [{ $text: { $search: query } }, { state: "Active" }] }, { score: { $meta: "textScore" } }).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position']).sort({ score: { $meta: "textScore" } });
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return restaurants;
    }
    async create(createRestaurantInput, file) {
        const position = await this.RestaurantsModel.countDocuments();
        const restaurant = new this.RestaurantsModel({ ...createRestaurantInput, position });
        const result = await this.awsService.createImage(file, restaurant._id);
        restaurant.image = result?.Key;
        await restaurant.save();
        restaurant.image = this.awsService.getUrl(result?.Key);
        return restaurant;
    }
    async findAll() {
        const restaurants = await this.RestaurantsModel.find().populate("category");
        for (const single of restaurants) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return restaurants;
    }
    async findOne(id) {
        const restaurant = await this.RestaurantsModel.findById(id).populate({ path: "category", select: { _id: 1 } });
        if (restaurant?.image)
            restaurant.image = this.awsService.getUrl(restaurant.image);
        return restaurant;
    }
    async update(id, updateRestaurantInput) {
        if (updateRestaurantInput?.image) {
            const { image } = await this.RestaurantsModel.findOne({ _id: updateRestaurantInput.id }, { image: 1, _id: 0 });
            this.awsService.removeImage(image);
        }
        await this.RestaurantsModel.findByIdAndUpdate(id, updateRestaurantInput);
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
        const restaurants = await this.RestaurantsModel.find({ $text: { $search: query } }, { score: { $meta: "textScore" } }).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position']).sort({ score: { $meta: "textScore" } });
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
    __metadata("design:paramtypes", [mongoose_2.Model,
        restaurant_categories_service_1.RestaurantCategoriesService,
        aws_service_1.AwsService])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map