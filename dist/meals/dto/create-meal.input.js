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
exports.CreateMealInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_meal_ingredient_input_1 = require("./create-meal-ingredient.input");
const create_meal_addition_input_1 = require("./create-meal-addition.input");
let CreateMealInput = class CreateMealInput {
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
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateMealInput.prototype, "restaurant", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], CreateMealInput.prototype, "tag", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateMealInput.prototype, "restaurantCategory", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMealInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMealInput.prototype, "titleEN", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateMealInput.prototype, "titleKR", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMealInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMealInput.prototype, "descriptionEN", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateMealInput.prototype, "descriptionKR", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateMealInput.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(() => [create_meal_addition_input_1.CreateMealAdditionInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateMealInput.prototype, "additions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [create_meal_ingredient_input_1.CreateMealIngredientInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateMealInput.prototype, "ingredients", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateMealInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateMealInput.prototype, "previousPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateMealInput.prototype, "points", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateMealInput.prototype, "pointsBack", void 0);
CreateMealInput = __decorate([
    (0, graphql_1.InputType)()
], CreateMealInput);
exports.CreateMealInput = CreateMealInput;
//# sourceMappingURL=create-meal.input.js.map