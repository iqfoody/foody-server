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
exports.PromoCode = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/entities/user.entity");
let PromoCode = class PromoCode {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], PromoCode.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PromoCode.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String] || [user_entity_1.User], { nullable: true }),
    __metadata("design:type", Array)
], PromoCode.prototype, "users", void 0);
__decorate([
    (0, graphql_1.Field)(() => String || user_entity_1.User, { nullable: true }),
    __metadata("design:type", Object)
], PromoCode.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PromoCode.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PromoCode.prototype, "discount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], PromoCode.prototype, "public", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], PromoCode.prototype, "expire", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PromoCode.prototype, "state", void 0);
PromoCode = __decorate([
    (0, graphql_1.ObjectType)()
], PromoCode);
exports.PromoCode = PromoCode;
//# sourceMappingURL=promo-code.entity.js.map