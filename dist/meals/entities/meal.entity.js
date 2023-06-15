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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const graphql_1 = require("@nestjs/graphql");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const meal_addition_entity_1 = require("./meal-addition.entity");
const meal_ingredient_entity_1 = require("./meal-ingredient.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
const restaurant_category_entity_1 = require("../../restaurant-categories/entities/restaurant-category.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
let Meal = class Meal {
    _id;
    category;
    restaurant;
    tag;
    restaurantCategory;
    title;
    titleEN;
    titleKR;
    description;
    descriptionEN;
    descriptionKR;
    image;
    additions;
    ingredients;
    price;
    previousPrice;
    points;
    pointsBack;
    position;
    state;
    createdAt;
    updatedAt;
    discount;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Meal.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => category_entity_1.Category, { nullable: true }),
    __metadata("design:type", Object)
], Meal.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => restaurant_entity_1.Restaurant),
    __metadata("design:type", Object)
], Meal.prototype, "restaurant", void 0);
__decorate([
    (0, graphql_1.Field)(() => tag_entity_1.Tag, { nullable: true }),
    __metadata("design:type", Object)
], Meal.prototype, "tag", void 0);
__decorate([
    (0, graphql_1.Field)(() => restaurant_category_entity_1.RestaurantCategory),
    __metadata("design:type", Object)
], Meal.prototype, "restaurantCategory", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Meal.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Meal.prototype, "titleEN", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Meal.prototype, "titleKR", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Meal.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Meal.prototype, "descriptionEN", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Meal.prototype, "descriptionKR", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Meal.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(() => [meal_addition_entity_1.MealAddition], { nullable: true }),
    __metadata("design:type", Array)
], Meal.prototype, "additions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [meal_ingredient_entity_1.MealIngredient], { nullable: true }),
    __metadata("design:type", Array)
], Meal.prototype, "ingredients", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Meal.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Meal.prototype, "previousPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Meal.prototype, "points", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Meal.prototype, "pointsBack", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Meal.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Meal.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Meal.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Meal.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Meal.prototype, "discount", void 0);
Meal = __decorate([
    (0, graphql_1.ObjectType)()
], Meal);
exports.Meal = Meal;
//# sourceMappingURL=meal.entity.js.map