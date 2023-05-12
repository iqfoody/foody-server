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
exports.Order = void 0;
const graphql_1 = require("@nestjs/graphql");
const address_entity_1 = require("../../addresses/entities/address.entity");
const driver_entity_1 = require("../../drivers/entities/driver.entity");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const order_item_entity_1 = require("./order-item.entity");
let Order = class Order {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Order.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || user_entity_1.User),
    __metadata("design:type", Object)
], Order.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || restaurant_entity_1.Restaurant),
    __metadata("design:type", Object)
], Order.prototype, "restaurant", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || address_entity_1.Address),
    __metadata("design:type", Object)
], Order.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => [order_item_entity_1.OrderItem]),
    __metadata("design:type", Array)
], Order.prototype, "meals", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || driver_entity_1.Driver, { nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "driver", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Order.prototype, "deliveryPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Order.prototype, "tableware", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "promoCode", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "discount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "percent", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "walletAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "walletPoint", void 0);
Order = __decorate([
    (0, graphql_1.ObjectType)()
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map