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
exports.PromoCodesSchema = exports.PromoCodes = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let PromoCodes = class PromoCodes {
    name;
    users;
    user;
    type;
    discount;
    isPublic;
    expire;
    state;
};
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "name required"], unique: [true, "name unique"] }),
    __metadata("design:type", String)
], PromoCodes.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: "Users", default: [] }),
    __metadata("design:type", Array)
], PromoCodes.prototype, "users", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Users" }),
    __metadata("design:type", Object)
], PromoCodes.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Percent" }),
    __metadata("design:type", String)
], PromoCodes.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "Discount required"] }),
    __metadata("design:type", Number)
], PromoCodes.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Boolean, default: true }),
    __metadata("design:type", Boolean)
], PromoCodes.prototype, "isPublic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Date, required: [true, "expire required"] }),
    __metadata("design:type", Date)
], PromoCodes.prototype, "expire", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Active" }),
    __metadata("design:type", String)
], PromoCodes.prototype, "state", void 0);
PromoCodes = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PromoCodes);
exports.PromoCodes = PromoCodes;
exports.PromoCodesSchema = mongoose_1.SchemaFactory.createForClass(PromoCodes);
//# sourceMappingURL=promoCodes.schema.js.map