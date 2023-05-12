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
exports.RestaurantCategory = void 0;
const graphql_1 = require("@nestjs/graphql");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
let RestaurantCategory = class RestaurantCategory {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], RestaurantCategory.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || restaurant_entity_1.Restaurant),
    __metadata("design:type", Object)
], RestaurantCategory.prototype, "restaurant", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RestaurantCategory.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RestaurantCategory.prototype, "titleEN", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RestaurantCategory.prototype, "titleKR", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], RestaurantCategory.prototype, "position", void 0);
RestaurantCategory = __decorate([
    (0, graphql_1.ObjectType)()
], RestaurantCategory);
exports.RestaurantCategory = RestaurantCategory;
//# sourceMappingURL=restaurant-category.entity.js.map