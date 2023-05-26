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
exports.AdminsController = void 0;
const common_1 = require("@nestjs/common");
const admins_service_1 = require("./admins.service");
const aws_service_1 = require("../aws/aws.service");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const admin_entity_1 = require("./entities/admin.entity");
const platform_express_1 = require("@nestjs/platform-express");
const create_admin_input_1 = require("./dto/create-admin.input");
const update_admin_input_1 = require("./dto/update-admin.input");
let AdminsController = class AdminsController {
    adminsService;
    awsService;
    constructor(adminsService, awsService) {
        this.adminsService = adminsService;
        this.awsService = awsService;
    }
    async createAdmin(createAdminInput, file, context) {
        return this.adminsService.create(context.user._id, createAdminInput, file);
    }
    async updateAdmin(updateAdminInput, file) {
        const result = await this.awsService.createImage(file, updateAdminInput.id);
        return this.adminsService.update(updateAdminInput.id, { ...updateAdminInput, image: result?.Key });
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: admin_entity_1.Admin }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_input_1.CreateAdminInput, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: admin_entity_1.Admin }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_admin_input_1.UpdateAdminInput, Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "updateAdmin", null);
AdminsController = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, common_1.Controller)('admins'),
    __metadata("design:paramtypes", [admins_service_1.AdminsService,
        aws_service_1.AwsService])
], AdminsController);
exports.AdminsController = AdminsController;
//# sourceMappingURL=admins.controller.js.map