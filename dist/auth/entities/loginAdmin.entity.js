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
exports.LoginAdmin = void 0;
const graphql_1 = require("@nestjs/graphql");
const admin_entity_1 = require("../../admins/entities/admin.entity");
let LoginAdmin = class LoginAdmin {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginAdmin.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginAdmin.prototype, "refreshToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => admin_entity_1.Admin),
    __metadata("design:type", admin_entity_1.Admin)
], LoginAdmin.prototype, "user", void 0);
LoginAdmin = __decorate([
    (0, graphql_1.ObjectType)()
], LoginAdmin);
exports.LoginAdmin = LoginAdmin;
//# sourceMappingURL=loginAdmin.entity.js.map