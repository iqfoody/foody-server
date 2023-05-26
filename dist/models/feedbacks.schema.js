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
exports.FeedbacksSchema = exports.Feedbacks = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Feedbacks = class Feedbacks {
    subject;
    message;
    name;
    phoneNumber;
    user;
};
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "title required"] }),
    __metadata("design:type", String)
], Feedbacks.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "message required"] }),
    __metadata("design:type", String)
], Feedbacks.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Feedbacks.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Feedbacks.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", Object)
], Feedbacks.prototype, "user", void 0);
Feedbacks = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Feedbacks);
exports.Feedbacks = Feedbacks;
exports.FeedbacksSchema = mongoose_1.SchemaFactory.createForClass(Feedbacks);
//# sourceMappingURL=feedbacks.schema.js.map