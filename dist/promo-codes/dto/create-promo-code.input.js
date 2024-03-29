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
exports.CreatePromoCodeInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreatePromoCodeInput = class CreatePromoCodeInput {
    name;
    user;
    type;
    discount;
    usageTimes;
    isPublic;
    expire;
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreatePromoCodeInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], CreatePromoCodeInput.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreatePromoCodeInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreatePromoCodeInput.prototype, "discount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreatePromoCodeInput.prototype, "usageTimes", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], CreatePromoCodeInput.prototype, "isPublic", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], CreatePromoCodeInput.prototype, "expire", void 0);
CreatePromoCodeInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePromoCodeInput);
exports.CreatePromoCodeInput = CreatePromoCodeInput;
//# sourceMappingURL=create-promo-code.input.js.map