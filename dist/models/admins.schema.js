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
exports.AdminsSchema = exports.Admins = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
let Admins = class Admins {
    name;
    email;
    password;
    type;
    image;
    state;
    ip;
    platform;
    deviceToken;
    refreshToken;
    comparePassword;
    compareToken;
};
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'name field required'] }),
    __metadata("design:type", String)
], Admins.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, "email E0001"], unique: [true, 'email E0011'], lowercase: [true] }),
    __metadata("design:type", String)
], Admins.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'password E0004'], minlength: [6, 'password E0004'] }),
    __metadata("design:type", String)
], Admins.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'type field is required'], }),
    __metadata("design:type", String)
], Admins.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admins.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Active" }),
    __metadata("design:type", String)
], Admins.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admins.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admins.prototype, "platform", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admins.prototype, "deviceToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admins.prototype, "refreshToken", void 0);
Admins = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        methods: {
            async comparePassword(password) {
                const isMatched = await (0, bcryptjs_1.compare)(password, this.password);
                return isMatched;
            },
            async compareToken(refreshToken) {
                const isMatched = await (0, bcryptjs_1.compare)(refreshToken, this.refreshToken);
                return isMatched;
            },
        },
        statics: {
            async login(loginAdmin) {
                const admin = await this.findOne({ $and: [{ email: loginAdmin.username }, { state: "Active" }] });
                if (!admin)
                    return;
                const verifyed = await admin.comparePassword(loginAdmin.password);
                if (!verifyed)
                    throw new common_1.BadRequestException('password E0005');
                return admin;
            },
        },
    })
], Admins);
exports.Admins = Admins;
exports.AdminsSchema = mongoose_1.SchemaFactory.createForClass(Admins);
exports.AdminsSchema.index({ email: 1 });
exports.AdminsSchema.pre('save', async function (next) {
    const salt = await (0, bcryptjs_1.genSalt)();
    const hashed = await (0, bcryptjs_1.hash)(this.password, salt);
    this.password = hashed;
    next();
});
//# sourceMappingURL=admins.schema.js.map