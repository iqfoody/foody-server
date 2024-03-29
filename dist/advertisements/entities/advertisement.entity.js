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
exports.Advertisement = void 0;
const graphql_1 = require("@nestjs/graphql");
const meal_entity_1 = require("../../meals/entities/meal.entity");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Advertisement = class Advertisement {
    _id;
    meal;
    restaurant;
    user;
    title;
    titleEN;
    titleKR;
    image;
    type;
    position;
    state;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Advertisement.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => meal_entity_1.Meal, { nullable: true }),
    __metadata("design:type", Object)
], Advertisement.prototype, "meal", void 0);
__decorate([
    (0, graphql_1.Field)(() => restaurant_entity_1.Restaurant, { nullable: true }),
    __metadata("design:type", Object)
], Advertisement.prototype, "restaurant", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Advertisement.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Advertisement.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Advertisement.prototype, "titleEN", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Advertisement.prototype, "titleKR", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Advertisement.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Advertisement.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Advertisement.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Advertisement.prototype, "state", void 0);
Advertisement = __decorate([
    (0, graphql_1.ObjectType)()
], Advertisement);
exports.Advertisement = Advertisement;
//# sourceMappingURL=advertisement.entity.js.map