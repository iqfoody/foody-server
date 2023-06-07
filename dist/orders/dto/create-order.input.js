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
exports.CreateOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_order_item_entity_1 = require("./create-order-item.entity");
let CreateOrderInput = class CreateOrderInput {
    user;
    restaurant;
    address;
    meals;
    driver;
    tableware;
    details;
    paymentMethod;
    promoCode;
    no;
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "restaurant", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => [create_order_item_entity_1.CreateOrderItemInput]),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "meals", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "driver", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], CreateOrderInput.prototype, "tableware", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "paymentMethod", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "promoCode", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "no", void 0);
CreateOrderInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOrderInput);
exports.CreateOrderInput = CreateOrderInput;
//# sourceMappingURL=create-order.input.js.map