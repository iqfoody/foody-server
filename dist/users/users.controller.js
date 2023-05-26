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
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const users_service_1 = require("./users.service");
const aws_service_1 = require("../aws/aws.service");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const user_entity_1 = require("./entities/user.entity");
const password_user_input_1 = require("./dto/password-user.input");
const update_user_input_1 = require("./dto/update-user.input");
const update_info_input_1 = require("./dto/update-info.input");
const create_user_input_1 = require("./dto/create-user.input");
let UsersController = class UsersController {
    usersService;
    awsService;
    constructor(usersService, awsService) {
        this.usersService = usersService;
        this.awsService = awsService;
    }
    async update(updateUserInfo, file, req) {
        if (file) {
            const result = await this.awsService.createImage(file, req.user._id);
            return this.usersService.update(req.user._id, { ...updateUserInfo, image: result?.Key });
        }
        else {
            return this.usersService.update(req.user._id, updateUserInfo);
        }
    }
    async password(passwordUserInput, req) {
        return this.usersService.password(req.user._id, passwordUserInput);
    }
    async createUser(createUserInput, file) {
        return this.usersService.createUser(createUserInput, file);
    }
    async updateUser(updateUserInput, file) {
        const result = await this.awsService.createImage(file, updateUserInput.id);
        return this.usersService.updateUser(updateUserInput.id, { ...updateUserInput, image: result?.Key });
    }
};
__decorate([
    (0, common_1.Put)('/profile'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.UpdateInfo, subject: user_entity_1.User }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_info_input_1.UpdateUserInfo, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/password'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Password, subject: user_entity_1.User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_user_input_1.PasswordUserInput, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "password", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: user_entity_1.User }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: user_entity_1.User }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
UsersController = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        aws_service_1.AwsService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map