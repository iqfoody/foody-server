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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealsSchema = exports.Meals = exports.MealAdditionsSchema = exports.MealAdditions = exports.MealIngredientsSchema = exports.MealIngredients = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let MealIngredients = class MealIngredients {
    title;
    titleEN;
    titleKR;
};
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "title required"] }),
    __metadata("design:type", String)
], MealIngredients.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "titleEN required"] }),
    __metadata("design:type", String)
], MealIngredients.prototype, "titleEN", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MealIngredients.prototype, "titleKR", void 0);
MealIngredients = __decorate([
    (0, mongoose_1.Schema)()
], MealIngredients);
exports.MealIngredients = MealIngredients;
exports.MealIngredientsSchema = mongoose_1.SchemaFactory.createForClass(MealIngredients);
let MealAdditions = class MealAdditions {
    title;
    titleEN;
    titleKR;
    price;
};
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "title required"] }),
    __metadata("design:type", String)
], MealAdditions.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "titleEN required"] }),
    __metadata("design:type", String)
], MealAdditions.prototype, "titleEN", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MealAdditions.prototype, "titleKR", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "price required"] }),
    __metadata("design:type", Number)
], MealAdditions.prototype, "price", void 0);
MealAdditions = __decorate([
    (0, mongoose_1.Schema)()
], MealAdditions);
exports.MealAdditions = MealAdditions;
exports.MealAdditionsSchema = mongoose_1.SchemaFactory.createForClass(MealAdditions);
let Meals = class Meals {
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
    discount;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Categories' }),
    __metadata("design:type", Object)
], Meals.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Restaurants", required: [true, "restaurant requird"] }),
    __metadata("design:type", Object)
], Meals.prototype, "restaurant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Tags' }),
    __metadata("design:type", Object)
], Meals.prototype, "tag", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'RestaurantCategories', required: [true, "RestaurantCategories required"] }),
    __metadata("design:type", Object)
], Meals.prototype, "restaurantCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "title required"], index: { name: "text", description: "text", text: true } }),
    __metadata("design:type", String)
], Meals.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "titleEN required"], index: { name: "text", description: "text", text: true } }),
    __metadata("design:type", String)
], Meals.prototype, "titleEN", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: { name: "text", description: "text", text: true } }),
    __metadata("design:type", String)
], Meals.prototype, "titleKR", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "description required"] }),
    __metadata("design:type", String)
], Meals.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "descriptionEN required"] }),
    __metadata("design:type", String)
], Meals.prototype, "descriptionEN", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meals.prototype, "descriptionKR", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meals.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.MealAdditionsSchema] }),
    __metadata("design:type", Array)
], Meals.prototype, "additions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.MealIngredientsSchema] }),
    __metadata("design:type", Array)
], Meals.prototype, "ingredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "price required"], minlength: [250, "Min price 250"] }),
    __metadata("design:type", Number)
], Meals.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, minlength: [250, "Min price 250"] }),
    __metadata("design:type", Number)
], Meals.prototype, "previousPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0, maxlength: [25, "max points converter to price is FB20"], minlength: [5, "Min price 250"] }),
    __metadata("design:type", Number)
], Meals.prototype, "points", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0, maxlength: [100, "max points back is 100%"] }),
    __metadata("design:type", Number)
], Meals.prototype, "pointsBack", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0 }),
    __metadata("design:type", Number)
], Meals.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Active" }),
    __metadata("design:type", String)
], Meals.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0, minlength: [1000, "Min discount 1000"] }),
    __metadata("design:type", Number)
], Meals.prototype, "discount", void 0);
Meals = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Meals);
exports.Meals = Meals;
exports.MealsSchema = mongoose_1.SchemaFactory.createForClass(Meals);
//# sourceMappingURL=meals.schema.js.map