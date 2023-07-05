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
exports.CreateDriverInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const GraphQLUpload_1 = __importDefault(require("../../Graphql/GraphQLUpload"));
let CreateDriverInput = class CreateDriverInput {
    name;
    phoneNumber;
    password;
    country;
    city;
    image;
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateDriverInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateDriverInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateDriverInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateDriverInput.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateDriverInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => GraphQLUpload_1.default, { nullable: true }),
    __metadata("design:type", Object)
], CreateDriverInput.prototype, "image", void 0);
CreateDriverInput = __decorate([
    (0, graphql_1.InputType)()
], CreateDriverInput);
exports.CreateDriverInput = CreateDriverInput;
//# sourceMappingURL=create-driver.input.js.map