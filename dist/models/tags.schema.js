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
exports.TagsSchema = exports.Tags = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Tags = class Tags {
};
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "title required"] }),
    __metadata("design:type", String)
], Tags.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "titleEN required"] }),
    __metadata("design:type", String)
], Tags.prototype, "titleEN", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tags.prototype, "titleKR", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tags.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Number, default: 0 }),
    __metadata("design:type", Number)
], Tags.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Active" }),
    __metadata("design:type", String)
], Tags.prototype, "state", void 0);
Tags = __decorate([
    (0, mongoose_1.Schema)()
], Tags);
exports.Tags = Tags;
exports.TagsSchema = mongoose_1.SchemaFactory.createForClass(Tags);
//# sourceMappingURL=tags.schema.js.map