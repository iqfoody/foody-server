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
exports.OrderItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const meal_entity_1 = require("../../meals/entities/meal.entity");
let OrderItem = class OrderItem {
    meal;
    additions;
    addIngredients;
    removeIngredients;
    quantity;
};
__decorate([
    (0, graphql_1.Field)(() => String || meal_entity_1.Meal),
    __metadata("design:type", Object)
], OrderItem.prototype, "meal", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], OrderItem.prototype, "additions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], OrderItem.prototype, "addIngredients", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], OrderItem.prototype, "removeIngredients", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
OrderItem = __decorate([
    (0, graphql_1.ObjectType)()
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=order-item.entity.js.map