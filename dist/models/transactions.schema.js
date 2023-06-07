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
exports.TransactionsSchema = exports.Transactions = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Transactions = class Transactions {
    user;
    admin;
    driver;
    order;
    description;
    type;
    procedure;
    amount;
    previous;
    paymentMethod;
    state;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Users" }),
    __metadata("design:type", String)
], Transactions.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Admins" }),
    __metadata("design:type", String)
], Transactions.prototype, "admin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Drivers" }),
    __metadata("design:type", String)
], Transactions.prototype, "driver", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Orders" }),
    __metadata("design:type", String)
], Transactions.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "description required"] }),
    __metadata("design:type", String)
], Transactions.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "type required"] }),
    __metadata("design:type", String)
], Transactions.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "proceduer required"] }),
    __metadata("design:type", String)
], Transactions.prototype, "procedure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "amount required"] }),
    __metadata("design:type", Number)
], Transactions.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, required: [true, "previous required"] }),
    __metadata("design:type", Number)
], Transactions.prototype, "previous", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transactions.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Pending" }),
    __metadata("design:type", String)
], Transactions.prototype, "state", void 0);
Transactions = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Transactions);
exports.Transactions = Transactions;
exports.TransactionsSchema = mongoose_1.SchemaFactory.createForClass(Transactions);
//# sourceMappingURL=transactions.schema.js.map