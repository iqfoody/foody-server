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
exports.Notification = void 0;
const graphql_1 = require("@nestjs/graphql");
const driver_entity_1 = require("../../drivers/entities/driver.entity");
const meal_entity_1 = require("../../meals/entities/meal.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Notification = class Notification {
    _id;
    user;
    driver;
    order;
    restaurant;
    meal;
    type;
    title;
    titleEN;
    titleKR;
    body;
    bodyEN;
    bodyKR;
    image;
    state;
    createdAt;
    updatedAt;
    submit;
    dismiss;
    action;
    priority;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Notification.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => driver_entity_1.Driver, { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "driver", void 0);
__decorate([
    (0, graphql_1.Field)(() => order_entity_1.Order, { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => restaurant_entity_1.Restaurant, { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "restaurant", void 0);
__decorate([
    (0, graphql_1.Field)(() => meal_entity_1.Meal, { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "meal", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "titleEN", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "titleKR", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "body", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "bodyEN", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "bodyKR", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "submit", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "dismiss", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "action", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "priority", void 0);
Notification = __decorate([
    (0, graphql_1.ObjectType)()
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map