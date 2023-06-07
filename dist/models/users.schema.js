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
exports.UsersSchema = exports.Users = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
let Users = class Users {
    wallet;
    name;
    phoneNumber;
    email;
    password;
    type;
    country;
    city;
    approvedEmail;
    approvedPhoneNumber;
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
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Wallets", required: [true, "wallet required"] }),
    __metadata("design:type", Object)
], Users.prototype, "wallet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'name field required'] }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ length: [11, 'phoneNumber E0009'], required: [true, "phoneNumber E0009"], unique: [true, 'phoneNumber E0011'] }),
    __metadata("design:type", String)
], Users.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ lowercase: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: [true, 'password E0004'], minlength: [6, 'password E0004'] }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Bronze" }),
    __metadata("design:type", String)
], Users.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Ireq' }),
    __metadata("design:type", String)
], Users.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Baghdad" }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "approvedEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "approvedPhoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Users.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "Active" }),
    __metadata("design:type", String)
], Users.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Users.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Users.prototype, "platform", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Users.prototype, "deviceToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Users.prototype, "refreshToken", void 0);
Users = __decorate([
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
            async login(loginUserInput) {
                const user = await this.findOne({ $and: [{ phoneNumber: loginUserInput.username }, { state: "Active" }] }, { name: 1, wallet: 1, phoneNumber: 1, type: 1, city: 1, image: 1, refreshToken: 1, password: 1 }).populate({ path: "wallet", select: { points: 1, amount: 1, _id: 0 } });
                if (!user)
                    return;
                const verifyed = await user.comparePassword(loginUserInput.password);
                if (!verifyed)
                    throw new common_1.BadRequestException('password E0005');
                return user;
            },
        },
    })
], Users);
exports.Users = Users;
exports.UsersSchema = mongoose_1.SchemaFactory.createForClass(Users);
exports.UsersSchema.index({ phoneNumber: 1 });
exports.UsersSchema.pre('save', async function (next) {
    const salt = await (0, bcryptjs_1.genSalt)();
    const hashed = await (0, bcryptjs_1.hash)(this.password, salt);
    this.password = hashed;
    next();
});
//# sourceMappingURL=users.schema.js.map