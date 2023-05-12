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
exports.RestaurantsSchema = exports.Restaurants = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Restaurants = class Restaurants {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Categories' }),
    __metadata("design:type", Object)
], Restaurants.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.String, required: [true, "title required"], index: { name: "text", description: "text", text: true } }),
    __metadata("design:type", String)
], Restaurants.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "titleEN required"], index: { name: "text", description: "text", text: true } }),
    __metadata("design:type", String)
], Restaurants.prototype, "titleEN", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: { name: "text", description: "text", text: true } }),
    __metadata("design:type", String)
], Restaurants.prototype, "titleKR", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "description required"] }),
    __metadata("design:type", String)
], Restaurants.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "descriptionEN required"] }),
    __metadata("design:type", String)
], Restaurants.prototype, "descriptionEN", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurants.prototype, "descriptionKR", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "image required"] }),
    __metadata("design:type", String)
], Restaurants.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ maxLength: 5, minlength: 0, type: mongoose_2.default.Schema.Types.Decimal128, default: 5 }),
    __metadata("design:type", Number)
], Restaurants.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 1 }),
    __metadata("design:type", Number)
], Restaurants.prototype, "rates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "Time required"] }),
    __metadata("design:type", Number)
], Restaurants.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0 }),
    __metadata("design:type", Number)
], Restaurants.prototype, "deliveryPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0 }),
    __metadata("design:type", Number)
], Restaurants.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Active" }),
    __metadata("design:type", String)
], Restaurants.prototype, "state", void 0);
Restaurants = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Restaurants);
exports.Restaurants = Restaurants;
exports.RestaurantsSchema = mongoose_1.SchemaFactory.createForClass(Restaurants);
//# sourceMappingURL=restaurants.schema.js.map