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
exports.DriversSchema = exports.Drivers = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
let Drivers = class Drivers {
    name;
    phoneNumber;
    password;
    country;
    city;
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
], Drivers.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ length: [11, 'phoneNumber E0009'], required: [true, "phoneNumber E0009"], unique: [true, 'phoneNumber E0011'] }),
    __metadata("design:type", String)
], Drivers.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'password E0004'], minlength: [6, 'password E0004'] }),
    __metadata("design:type", String)
], Drivers.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Ireq' }),
    __metadata("design:type", String)
], Drivers.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'city field required'] }),
    __metadata("design:type", String)
], Drivers.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Drivers.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Active" }),
    __metadata("design:type", String)
], Drivers.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Drivers.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Drivers.prototype, "platform", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Drivers.prototype, "deviceToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Drivers.prototype, "refreshToken", void 0);
Drivers = __decorate([
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
            async login(loginInput) {
                const user = await this.findOne({ $and: [{ phoneNumber: loginInput.username }, { state: "Active" }] });
                if (!user)
                    return;
                const verifyed = await user.comparePassword(loginInput.password);
                if (!verifyed)
                    throw new common_1.BadRequestException('password E0005');
                return user;
            },
        },
    })
], Drivers);
exports.Drivers = Drivers;
exports.DriversSchema = mongoose_1.SchemaFactory.createForClass(Drivers);
exports.DriversSchema.index({ phoneNumber: 1 });
exports.DriversSchema.pre('save', async function (next) {
    const salt = await (0, bcryptjs_1.genSalt)();
    const hashed = await (0, bcryptjs_1.hash)(this.password, salt);
    this.password = hashed;
    next();
});
//# sourceMappingURL=drivers.schema.js.map