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
exports.Rate = void 0;
const graphql_1 = require("@nestjs/graphql");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Rate = class Rate {
    _id;
    user;
    restaurant;
    rate;
    description;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Rate.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || user_entity_1.User),
    __metadata("design:type", Object)
], Rate.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || restaurant_entity_1.Restaurant),
    __metadata("design:type", Object)
], Rate.prototype, "restaurant", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Rate.prototype, "rate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Rate.prototype, "description", void 0);
Rate = __decorate([
    (0, graphql_1.ObjectType)()
], Rate);
exports.Rate = Rate;
//# sourceMappingURL=rate.entity.js.map