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
exports.CreateUserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const GraphQLUpload_1 = __importDefault(require("../../Graphql/GraphQLUpload"));
let CreateUserInput = class CreateUserInput {
    name;
    phoneNumber;
    email;
    password;
    type;
    city;
    image;
    deviceToken;
    ip;
    platform;
    refreshToken;
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => GraphQLUpload_1.default, { nullable: true }),
    __metadata("design:type", Object)
], CreateUserInput.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "deviceToken", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "ip", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "platform", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "refreshToken", void 0);
CreateUserInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
//# sourceMappingURL=create-user.input.js.map