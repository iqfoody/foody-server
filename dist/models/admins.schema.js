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
exports.AdminsSchema = exports.Admins = exports.Permissions = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
let Permissions = class Permissions {
    object;
    abilities;
};
__decorate([
    (0, mongoose_1.Prop)({ unique: [true, "object name is unique"] }),
    __metadata("design:type", String)
], Permissions.prototype, "object", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Permissions.prototype, "abilities", void 0);
Permissions = __decorate([
    (0, mongoose_1.Schema)()
], Permissions);
exports.Permissions = Permissions;
const AdminPermission = typeof Permissions;
let Admins = class Admins {
    wallet;
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
    permissions;
    comparePassword;
    compareToken;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Wallets", required: [true, "wallet required"] }),
    __metadata("design:type", Object)
], Admins.prototype, "wallet", void 0);
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
    (0, mongoose_1.Prop)({ default: "Sub Admin" }),
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
__decorate([
    (0, mongoose_1.Prop)({ type: [AdminPermission] }),
    __metadata("design:type", Array)
], Admins.prototype, "permissions", void 0);
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