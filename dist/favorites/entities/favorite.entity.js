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
exports.Favorite = void 0;
const graphql_1 = require("@nestjs/graphql");
const meal_entity_1 = require("../../meals/entities/meal.entity");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Favorite = class Favorite {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Favorite.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || user_entity_1.User),
    __metadata("design:type", Object)
], Favorite.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || [restaurant_entity_1.Restaurant], { nullable: true }),
    __metadata("design:type", Object)
], Favorite.prototype, "restaurants", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || [meal_entity_1.Meal], { nullable: true }),
    __metadata("design:type", Object)
], Favorite.prototype, "meals", void 0);
Favorite = __decorate([
    (0, graphql_1.ObjectType)()
], Favorite);
exports.Favorite = Favorite;
//# sourceMappingURL=favorite.entity.js.map