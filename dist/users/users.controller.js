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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const users_service_1 = require("./users.service");
const aws_service_1 = require("../aws/aws.service");
const update_info_input_1 = require("./dto/update-info.input");
const firebase_auth_guard_1 = require("../firebase-auth/firebase-auth.guard");
let UsersController = class UsersController {
    usersService;
    awsService;
    constructor(usersService, awsService) {
        this.usersService = usersService;
        this.awsService = awsService;
    }
    async update(updateUserInfo, file, req) {
        if (file) {
            const result = await this.awsService.createRestImage(file, req.user);
            return this.usersService.update({ ...updateUserInfo, image: result?.Key, phoneNumber: req.user });
        }
        else {
            return this.usersService.update({ ...updateUserInfo, phoneNumber: req.user });
        }
    }
    async deleteAccount(req) {
        return this.usersService.delete(req.user);
    }
};
__decorate([
    (0, common_1.Put)('/profile'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_info_input_1.UpdateUserInfo, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteAccount", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        aws_service_1.AwsService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map