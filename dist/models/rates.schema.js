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
exports.RatesSchema = exports.Rates = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Rates = class Rates {
    user;
    restaurant;
    driver;
    rate;
    description;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users', required: [true, "User required"] }),
    __metadata("design:type", Object)
], Rates.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Restaurants' }),
    __metadata("design:type", Object)
], Rates.prototype, "restaurant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Drivers' }),
    __metadata("design:type", Object)
], Rates.prototype, "driver", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, minlength: [0, "0-5 rating rang"], maxlength: [5, "0-5 rating rang"] }),
    __metadata("design:type", Number)
], Rates.prototype, "rate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Rates.prototype, "description", void 0);
Rates = __decorate([
    (0, mongoose_1.Schema)()
], Rates);
exports.Rates = Rates;
exports.RatesSchema = mongoose_1.SchemaFactory.createForClass(Rates);
//# sourceMappingURL=rates.schema.js.map