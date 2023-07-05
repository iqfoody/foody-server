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
    MealsModel;
    awsService;
    constructor(MealsModel, awsService) {
        this.MealsModel = MealsModel;
        this.awsService = awsService;
    }
    async findForRestaurant(restaurant) {
        const meals = await this.MealsModel.find({ $and: [{ restaurant }, { state: "Active" }] }).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag']);
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
            if (single?.points)
                single.points = single.points * single.price;
            if (single?.pointsBack)
                single.pointsBack = (single.pointsBack / 100) * single.price;
        }
        return meals;
    }
    async findMealsInfinty(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.limit;
        const orderBy = limitEntity?.orderBy === "Max" ? -1 : 1;
        const total = await this.MealsModel.countDocuments({ state: "Active" });
        const meals = await this.MealsModel.find({ state: "Active" }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt']).limit(limitEntity.limit).skip(skipIndex).sort({ price: orderBy });
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { data: meals, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findForCategory(category, orderBy) {
        if (!(0, mongoose_2.isValidObjectId)(category))
            throw new common_1.BadRequestException("There isn't meals with this category id");
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
        const meals = await this.MealsModel.find({ $and: [{ category }, { state: "Active" }] }).select(['-position', '-state', '-__v', '-createdAt', '-updatedAt']).sort(sort);
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return meals;
    }
    async findForTag(tag) {
        if (!(0, mongoose_2.isValidObjectId)(tag))
            throw new common_1.BadRequestException("There isn't meals with this tag id");
        const meals = await this.MealsModel.find({ $and: [{ tag }, { state: "Active" }] }).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return meals;
    }
    async findForRestaurantCategory(restaurantCategory) {
        if (!(0, mongoose_2.isValidObjectId)(restaurantCategory))
            throw new common_1.BadRequestException("There isn't meals with this restaurant category id");
        const meals = await this.MealsModel.find({ $and: [{ restaurantCategory }, { state: "Active" }] }).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-restaurant', '-tag', '-restaurantCategory']);
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
            if (single?.points)
                single.points = single.points * single.price;
            if (single?.pointsBack)
                single.pointsBack = (single.pointsBack / 100) * single.price;
        }
        return meals;
    }
    async findMeal(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't meal with this id");
        const meal = await this.MealsModel.findOne({ $and: [{ _id: id }, { state: "Active" }] }).select(['-__v', '-createdAt', '-updatedAt', '-state', '-position', '-tag', '-restaurantCategory']).populate({ path: "restaurant", select: { title: 1, titleEN: 1, titleKR: 1 } });
        if (meal?.image)
            meal.image = this.awsService.getUrl(meal.image);
        return meal;
    }
    async searchMeals(query) {
        const search = new RegExp(query, 'i');
        const meals = await this.MealsModel.find({ $and: [{ $or: [{ title: search }, { titleEN: search }, { description: search }, { descriptionEN: search }] }, { state: "Active" }] }).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position', '-points', '-pointsBack', '-restaurantCategory']);
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return meals;
    }
    async create(createMealInput) {
        if (!createMealInput?.image)
            return new common_1.BadRequestException("image required");
        const position = await this.MealsModel.countDocuments();
        const meal = new this.MealsModel({ ...createMealInput, position });
        const result = await this.awsService.createImage(createMealInput.image, meal._id);
        meal.image = result?.Key;
        await meal.save();
        meal.image = this.awsService.getUrl(result?.Key);
        return meal;
    }
    async findAll(limitEntity) {
        const startIndex = limitEntity.page * limitEntity.limit;
        const meals = await this.MealsModel.find().sort({ position: 1 }).limit(limitEntity.limit).skip(startIndex).populate("category");
        const total = await this.MealsModel.countDocuments();
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { data: meals, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAllForRestaurant(limitEntity) {
        const startIndex = limitEntity.page * limitEntity.limit;
        const meals = await this.MealsModel.find({ $and: [{ restaurant: limitEntity.user }, { state: "Active" }] }).sort({ _id: -1 }).limit(limitEntity.limit).skip(startIndex);
        const total = await this.MealsModel.countDocuments({ $and: [{ restaurant: limitEntity.user }, { state: "Active" }] });
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { data: meals, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findOne(id) {
        const meal = await this.MealsModel.findById(id).populate({ path: "category", select: { _id: 1 } });
        if (meal?.image)
            meal.image = this.awsService.getUrl(meal.image);
        return meal;
    }
    async update(id, updateMealInput) {
        if (updateMealInput?.image) {
            const { image } = await this.MealsModel.findOne({ _id: updateMealInput.id }, { image: 1, _id: 0 });
            this.awsService.removeImage(image);
            const result = await this.awsService.createImage(updateMealInput.image, id);
            await this.MealsModel.findByIdAndUpdate(id, { ...updateMealInput, image: result?.Key });
        }
        else {
            await this.MealsModel.findByIdAndUpdate(id, updateMealInput);
        }
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
        if (image)
            this.awsService.removeImage(image);
        return "Success";
    }
    async findExtention(_id, restaurant) {
        if (!(0, mongoose_2.isValidObjectId)(_id) || !(0, mongoose_2.isValidObjectId)(restaurant))
            throw new common_1.BadRequestException("There isn't meal or restaurant with this id");
        return this.MealsModel.findOne({ $and: [{ _id }, { restaurant }] }, { additions: 1, ingredients: 1, price: 1, points: 1, pointsBack: 1, discount: 1, _id: 0 });
    }
    async search(query) {
        const search = new RegExp(query, 'i');
        const meals = await this.MealsModel.find({ $and: [{ $or: [{ title: search }, { titleEN: search }, { description: search }, { descriptionEN: search }] }, { state: "Active" }] }).select(['-__v', '-updatedAt', '-createdAt', '-state', '-position', '-points', '-pointsBack', '-restaurantCategory']);
        for (const single of meals) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return meals;
    }
    async home() {
        return this.MealsModel.countDocuments();
    }
    async createMealObject(createMealObject) {
        const meal = await this.MealsModel.findById(createMealObject.id);
        if (createMealObject?.price) {
            meal.additions.push(createMealObject);
            await this.MealsModel.findByIdAndUpdate(createMealObject.id, { additions: meal.additions });
            return meal.additions[meal.additions.length - 1];
        }
        else {
            meal.ingredients.push(createMealObject);
            await this.MealsModel.findByIdAndUpdate(createMealObject.id, { ingredients: meal.ingredients });
            return meal.ingredients[meal.ingredients.length - 1];
        }
    }
    async updateMealObject(updateMealObject) {
        const meal = await this.MealsModel.findById(updateMealObject.id);
        if (updateMealObject?.price) {
            const additions = meal.additions.map((addition => addition._id == updateMealObject._id ? updateMealObject : addition));
            await this.MealsModel.findByIdAndUpdate(meal._id, { additions: additions });
            return "Success";
        }
        else {
            const ingredients = meal.ingredients.map((ingredient => ingredient._id == updateMealObject._id ? updateMealObject : ingredient));
            await this.MealsModel.findByIdAndUpdate(meal._id, { ingredients: ingredients });
            return "Success";
        }
    }
    async removeMealObject(removeMealObject) {
        const meal = await this.MealsModel.findById(removeMealObject.id);
        if (removeMealObject?.addition) {
            const additions = meal.additions.filter((addition => addition._id != removeMealObject.addition));
            await this.MealsModel.findByIdAndUpdate(meal._id, { additions: additions });
            return "Success";
        }
        else {
            const ingredients = meal.ingredients.filter((ingredient => ingredient._id != removeMealObject.ingredient));
            await this.MealsModel.findByIdAndUpdate(meal._id, { ingredients: ingredients });
            return "Success";
        }
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