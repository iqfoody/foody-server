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
exports.NotificationsSchema = exports.Notifications = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Notifications = class Notifications {
    user;
    driver;
    order;
    restaurant;
    meal;
    type;
    title;
    titleEN;
    titleKR;
    body;
    bodyEN;
    bodyKR;
    submit;
    dismiss;
    priority;
    action;
    image;
    state;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", Object)
], Notifications.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Drivers' }),
    __metadata("design:type", Object)
], Notifications.prototype, "driver", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Orders' }),
    __metadata("design:type", Object)
], Notifications.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Restaruants" }),
    __metadata("design:type", Object)
], Notifications.prototype, "restaurant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Meals' }),
    __metadata("design:type", Object)
], Notifications.prototype, "meal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Public" }),
    __metadata("design:type", String)
], Notifications.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notifications.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notifications.prototype, "titleEN", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notifications.prototype, "titleKR", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notifications.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notifications.prototype, "bodyEN", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notifications.prototype, "bodyKR", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notifications.prototype, "submit", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notifications.prototype, "dismiss", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notifications.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notifications.prototype, "action", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notifications.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Unread" }),
    __metadata("design:type", String)
], Notifications.prototype, "state", void 0);
Notifications = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Notifications);
exports.Notifications = Notifications;
exports.NotificationsSchema = mongoose_1.SchemaFactory.createForClass(Notifications);
//# sourceMappingURL=notifications.schema.js.map