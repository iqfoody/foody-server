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
exports.AddressesSchema = exports.Addresses = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Addresses = class Addresses {
    user;
    title;
    country;
    city;
    address;
    building;
    apartment;
    phoneNumber;
    description;
    latitude;
    longitude;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users', required: [true, "user required"] }),
    __metadata("design:type", Object)
], Addresses.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "title required"] }),
    __metadata("design:type", String)
], Addresses.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Iraq" }),
    __metadata("design:type", String)
], Addresses.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Baghdad" }),
    __metadata("design:type", String)
], Addresses.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Addresses.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Addresses.prototype, "building", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Addresses.prototype, "apartment", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Addresses.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Addresses.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "latitude required"] }),
    __metadata("design:type", Number)
], Addresses.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "longitude required"] }),
    __metadata("design:type", Number)
], Addresses.prototype, "longitude", void 0);
Addresses = __decorate([
    (0, mongoose_1.Schema)()
], Addresses);
exports.Addresses = Addresses;
exports.AddressesSchema = mongoose_1.SchemaFactory.createForClass(Addresses);
//# sourceMappingURL=addresses.schema.js.map