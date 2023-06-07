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
exports.HomeResponse = exports.WeekResponse = exports.StatusResponse = exports.RatingResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_entity_1 = require("../orders/entities/order.entity");
const user_entity_1 = require("../users/entities/user.entity");
let RatingResponse = class RatingResponse {
    user;
    rate;
};
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], RatingResponse.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], RatingResponse.prototype, "rate", void 0);
RatingResponse = __decorate([
    (0, graphql_1.ObjectType)()
], RatingResponse);
exports.RatingResponse = RatingResponse;
let StatusResponse = class StatusResponse {
    Pending;
    InProgress;
    InDelivery;
    Completed;
    Canceled;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatusResponse.prototype, "Pending", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatusResponse.prototype, "InProgress", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatusResponse.prototype, "InDelivery", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatusResponse.prototype, "Completed", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatusResponse.prototype, "Canceled", void 0);
StatusResponse = __decorate([
    (0, graphql_1.ObjectType)()
], StatusResponse);
exports.StatusResponse = StatusResponse;
let WeekResponse = class WeekResponse {
    d0;
    d1;
    d2;
    d3;
    d4;
    d5;
    d6;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], WeekResponse.prototype, "d0", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], WeekResponse.prototype, "d1", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], WeekResponse.prototype, "d2", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], WeekResponse.prototype, "d3", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], WeekResponse.prototype, "d4", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], WeekResponse.prototype, "d5", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], WeekResponse.prototype, "d6", void 0);
WeekResponse = __decorate([
    (0, graphql_1.ObjectType)()
], WeekResponse);
exports.WeekResponse = WeekResponse;
let HomeResponse = class HomeResponse {
    orders;
    recentlyOrders;
    week;
    status;
    users;
    recentlyUsers;
    rating;
    total;
    recentlyRating;
    restaurants;
    meals;
    drivers;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HomeResponse.prototype, "orders", void 0);
__decorate([
    (0, graphql_1.Field)(() => [order_entity_1.Order], { nullable: true }),
    __metadata("design:type", Array)
], HomeResponse.prototype, "recentlyOrders", void 0);
__decorate([
    (0, graphql_1.Field)(() => WeekResponse),
    __metadata("design:type", WeekResponse)
], HomeResponse.prototype, "week", void 0);
__decorate([
    (0, graphql_1.Field)(() => StatusResponse),
    __metadata("design:type", StatusResponse)
], HomeResponse.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HomeResponse.prototype, "users", void 0);
__decorate([
    (0, graphql_1.Field)(() => [user_entity_1.User], { nullable: true }),
    __metadata("design:type", Array)
], HomeResponse.prototype, "recentlyUsers", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], HomeResponse.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], HomeResponse.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RatingResponse], { nullable: true }),
    __metadata("design:type", Array)
], HomeResponse.prototype, "recentlyRating", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], HomeResponse.prototype, "restaurants", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HomeResponse.prototype, "meals", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], HomeResponse.prototype, "drivers", void 0);
HomeResponse = __decorate([
    (0, graphql_1.ObjectType)()
], HomeResponse);
exports.HomeResponse = HomeResponse;
//# sourceMappingURL=homeResponse.entity.js.map