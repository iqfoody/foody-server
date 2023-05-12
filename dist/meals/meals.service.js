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
exports.MealsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_service_1 = require("../aws/aws.service");
let MealsService = class MealsService {
    constructor(MealsModel, awsService) {
        this.MealsModel = MealsModel;
        this.awsService = awsService;
    }
    async create(createMealInput, file) {
        const position = await this.MealsModel.countDocuments();
        const meal = new this.MealsModel(Object.assign(Object.assign({}, createMealInput), { position }));
        const result = await this.awsService.createImage(file, meal._id);
        meal.image = result === null || result === void 0 ? void 0 : result.Key;
        await meal.save();
        meal.image = this.awsService.getUrl(result === null || result === void 0 ? void 0 : result.Key);
        return meal;
    }
    async findAll() {
        const meals = await this.MealsModel.find();
        for (const single of meals) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return meals;
    }
    async findForRestaurant(restaurant) {
        const meals = await this.MealsModel.find({ $and: [{ restaurant }, { state: "Active" }] }).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
        for (const single of meals) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return meals;
    }
    async findMealsInfinty(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.limit;
        const total = await this.MealsModel.countDocuments({ state: "Active" });
        const meals = await this.MealsModel.find({ state: "Active" }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt']).limit(limitEntity.limit).skip(skipIndex).sort({ position: 1 });
        for (const single of meals) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { data: meals, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findForTag(tag) {
        const meals = await this.MealsModel.find({ $and: [{ tag }, { state: "Active" }] }).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
        for (const single of meals) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return meals;
    }
    async findForRestaurantCategory(restaurantCategories) {
        const meals = await this.MealsModel.find({ $and: [{ restaurantCategories }, { state: "Active" }] }).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
        for (const single of meals) {
            if (single === null || single === void 0 ? void 0 : single.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return meals;
    }
    async findOne(id) {
        const meal = await this.MealsModel.findById(id);
        if (meal === null || meal === void 0 ? void 0 : meal.image)
            meal.image = this.awsService.getUrl(meal.image);
        return meal;
    }
    async findMeal(id) {
        const meal = await this.MealsModel.findOne({ $and: [{ _id: id }, { state: "Active" }] }).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
        if (meal === null || meal === void 0 ? void 0 : meal.image)
            meal.image = this.awsService.getUrl(meal.image);
        return meal;
    }
    async update(id, updateMealInput) {
        if (updateMealInput === null || updateMealInput === void 0 ? void 0 : updateMealInput.image) {
            const { image } = await this.MealsModel.findOne({ _id: updateMealInput.id }, { image: 1, _id: 0 });
            this.awsService.removeImage(image);
        }
        await this.MealsModel.findByIdAndUpdate(id, updateMealInput);
        return "Success";
    }
    async state(stateInput) {
        await this.MealsModel.findByIdAndUpdate(stateInput.id, stateInput);
        return "Success";
    }
    async position(updatePositionInput) {
        for (const single of updatePositionInput) {
            await this.MealsModel.findByIdAndUpdate(single.id, { position: single.position });
        }
        return "success";
    }
    async remove(id) {
        const { image } = await this.MealsModel.findOne({ _id: id }, { image: 1, _id: 0 });
        await this.MealsModel.findByIdAndDelete(id);
        this.awsService.removeImage(image);
        return "Success";
    }
    async findExtention(_id) {
        return this.MealsModel.findOne({ _id }, { additions: 1, ingredients: 1, price: 1, points: 1, _id: 0 });
    }
    async search(query) {
        return this.MealsModel.find({ $and: [{ $text: { $search: query } }, { state: "Active" }] }, { score: { $meta: "textScore" } }).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position', '-points', '-pointsBack', '-restaurantCategory']).sort({ score: { $meta: "textScore" } });
    }
};
MealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Meals")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], MealsService);
exports.MealsService = MealsService;
//# sourceMappingURL=meals.service.js.map