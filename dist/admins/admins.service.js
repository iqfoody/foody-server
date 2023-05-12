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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const aws_service_1 = require("../aws/aws.service");
const bcryptjs_1 = require("bcryptjs");
let AdminsService = class AdminsService {
    constructor(AdminsModel, awsService) {
        this.AdminsModel = AdminsModel;
        this.awsService = awsService;
    }
    async login(loginInput) {
        const admin = await this.AdminsModel.login(loginInput);
        if (admin === null || admin === void 0 ? void 0 : admin.image)
            admin.image = this.awsService.getUrl(admin === null || admin === void 0 ? void 0 : admin.image);
        return admin;
    }
    async create(_id, createAdminInput) {
        const superAdmin = await this.AdminsModel.findOne({ $and: [{ _id }, { type: "Admin" }] });
        if (!superAdmin)
            throw new common_1.ForbiddenException("Access Denied");
        const admin = new this.AdminsModel(createAdminInput);
        await admin.save();
        if (admin === null || admin === void 0 ? void 0 : admin.image)
            admin.image = this.awsService.getUrl(admin === null || admin === void 0 ? void 0 : admin.image);
        return admin;
    }
    async findAll() {
        const admins = await this.AdminsModel.find({ type: { $ne: "Admin" } });
        for (const admin of admins) {
            if (admin === null || admin === void 0 ? void 0 : admin.image)
                admin.image = this.awsService.getUrl(admin === null || admin === void 0 ? void 0 : admin.image);
        }
        return admins;
    }
    async findOne(_id) {
        const admin = await this.AdminsModel.findOne({ $and: [{ _id }, { type: { $ne: "Admin" } }] });
        if (admin === null || admin === void 0 ? void 0 : admin.image)
            admin.image = this.awsService.getUrl(admin === null || admin === void 0 ? void 0 : admin.image);
        return admin;
    }
    async findInfo(_id) {
        const admin = await this.AdminsModel.findOne({ $and: [{ _id }, { state: "Active" }] });
        if (admin === null || admin === void 0 ? void 0 : admin.image)
            admin.image = this.awsService.getUrl(admin === null || admin === void 0 ? void 0 : admin.image);
        return admin;
    }
    async findByEmail(email) {
        const admin = await this.AdminsModel.findOne({ $and: [{ email }, { type: { $ne: "Admin" } }] });
        if (admin === null || admin === void 0 ? void 0 : admin.image)
            admin.image = this.awsService.getUrl(admin === null || admin === void 0 ? void 0 : admin.image);
        return admin;
    }
    async updateAny(_id, updateAdminInput) {
        await this.AdminsModel.findOneAndUpdate({ $and: [{ _id }, { type: { $ne: "Admin" } }] }, updateAdminInput);
        return;
    }
    async update(id, updateAdminInput) {
        let E0011 = await this.findByEmail(updateAdminInput.email);
        if (E0011 && id != E0011._id)
            throw new Error('email E0002');
        if (updateAdminInput === null || updateAdminInput === void 0 ? void 0 : updateAdminInput.image) {
            const { image } = await this.AdminsModel.findOne({ _id: updateAdminInput.id }, { image: 1, _id: 0 });
            if (image)
                this.awsService.removeImage(image);
        }
        await this.AdminsModel.findByIdAndUpdate(id, updateAdminInput);
        return { message: "account updated" };
    }
    async passwordAdmin(id, updatePasswordAdmin) {
        const salt = await (0, bcryptjs_1.genSalt)();
        const hashed = await (0, bcryptjs_1.hash)(updatePasswordAdmin.password, salt);
        await this.AdminsModel.findByIdAndUpdate(id, { password: hashed, refreshToken: null });
        return "Success";
    }
    async state(stateInput) {
        await this.AdminsModel.findOneAndUpdate({ $and: [{ _id: stateInput.id }, { type: { $ne: "Admin" } }] }, stateInput);
        return "success";
    }
    async logout(_id) {
        await this.AdminsModel.findOneAndUpdate({ $and: [{ _id }, { state: "Active" }, { refreshToken: { $ne: null } }] }, { refreshToken: null });
    }
    async refresh(id, token) {
        const admin = await this.AdminsModel.findById(id);
        if (!admin)
            throw new common_1.NotFoundException('Access Denied');
        const isMatched = admin.compareToken(token);
        if (!isMatched)
            throw new common_1.ForbiddenException('Access Denied');
        return admin;
    }
    async remove(_id) {
        const { image } = await this.AdminsModel.findOne({ $and: [{ _id }, { type: { $ne: "Admin" } }] }, { image: 1, _id: 0 });
        await this.AdminsModel.findOneAndDelete({ $and: [{ _id }, { type: { $ne: "Admin" } }] });
        if (image)
            this.awsService.removeImage(image);
        return "success";
    }
};
AdminsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Admins")),
    __metadata("design:paramtypes", [Object, aws_service_1.AwsService])
], AdminsService);
exports.AdminsService = AdminsService;
//# sourceMappingURL=admins.service.js.map