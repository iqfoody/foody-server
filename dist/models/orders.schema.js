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
exports.OrdersSchema = exports.Orders = exports.OrderItemSchema = exports.OrderItems = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const meals_schema_1 = require("./meals.schema");
let OrderItems = class OrderItems {
    meal;
    additions;
    addIngredients;
    removeIngredients;
    quantity;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Meals', required: [true, "Meals required"] }),
    __metadata("design:type", Object)
], OrderItems.prototype, "meal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [meals_schema_1.MealAdditionsSchema] }),
    __metadata("design:type", Array)
], OrderItems.prototype, "additions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [meals_schema_1.MealIngredientsSchema] }),
    __metadata("design:type", Array)
], OrderItems.prototype, "addIngredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [meals_schema_1.MealIngredientsSchema] }),
    __metadata("design:type", Array)
], OrderItems.prototype, "removeIngredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "Quantity required"], minlength: [1, "Min quantity 1"] }),
    __metadata("design:type", Number)
], OrderItems.prototype, "quantity", void 0);
OrderItems = __decorate([
    (0, mongoose_1.Schema)()
], OrderItems);
exports.OrderItems = OrderItems;
exports.OrderItemSchema = mongoose_1.SchemaFactory.createForClass(OrderItems);
let Orders = class Orders {
    user;
    restaurant;
    address;
    meals;
    driver;
    totalPrice;
    type;
    deliveryPrice;
    recievedPrice;
    tableware;
    hasRating;
    details;
    paymentMethod;
    state;
    promoCode;
    discount;
    discountType;
    walletAmount;
    walletPoints;
    pointsBack;
    totalPoints;
    price;
    no;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users', required: [true, "user required"] }),
    __metadata("design:type", Object)
], Orders.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Restaurants', required: [true, "Restaurants required"] }),
    __metadata("design:type", Object)
], Orders.prototype, "restaurant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Addresses', required: [true, "Addresses required"] }),
    __metadata("design:type", Object)
], Orders.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.OrderItemSchema], required: [true, "Meals required"] }),
    __metadata("design:type", Array)
], Orders.prototype, "meals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Drivers' }),
    __metadata("design:type", Object)
], Orders.prototype, "driver", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "Total price required"], minlength: [1, "Min total price 1"] }),
    __metadata("design:type", Number)
], Orders.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Auto" }),
    __metadata("design:type", String)
], Orders.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0 }),
    __metadata("design:type", Number)
], Orders.prototype, "deliveryPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0 }),
    __metadata("design:type", Number)
], Orders.prototype, "recievedPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Boolean, default: true }),
    __metadata("design:type", Boolean)
], Orders.prototype, "tableware", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Boolean, default: false }),
    __metadata("design:type", Boolean)
], Orders.prototype, "hasRating", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Orders.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Cash" }),
    __metadata("design:type", String)
], Orders.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Pending" }),
    __metadata("design:type", String)
], Orders.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Orders.prototype, "promoCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number }),
    __metadata("design:type", Number)
], Orders.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Orders.prototype, "discountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number }),
    __metadata("design:type", Number)
], Orders.prototype, "walletAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number }),
    __metadata("design:type", Number)
], Orders.prototype, "walletPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number }),
    __metadata("design:type", Number)
], Orders.prototype, "pointsBack", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, minlength: [0, "Min total price 1"] }),
    __metadata("design:type", Number)
], Orders.prototype, "totalPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, minlength: [0, "Min total price 1"] }),
    __metadata("design:type", Number)
], Orders.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0 }),
    __metadata("design:type", Number)
], Orders.prototype, "no", void 0);
Orders = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Orders);
exports.Orders = Orders;
exports.OrdersSchema = mongoose_1.SchemaFactory.createForClass(Orders);
//# sourceMappingURL=orders.schema.js.map