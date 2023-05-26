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
exports.AdvertisementsController = void 0;
const common_1 = require("@nestjs/common");
const advertisements_service_1 = require("./advertisements.service");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("../aws/aws.service");
const create_advertisement_input_1 = require("./dto/create-advertisement.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const advertisement_entity_1 = require("./entities/advertisement.entity");
const update_advertisement_input_1 = require("./dto/update-advertisement.input");
let AdvertisementsController = class AdvertisementsController {
    advertisementsService;
    awsService;
    constructor(advertisementsService, awsService) {
        this.advertisementsService = advertisementsService;
        this.awsService = awsService;
    }
    async getAdvertisement(id) {
        return this.advertisementsService.findAdvertisement(id);
    }
    async getAdvertisements() {
        return this.advertisementsService.findAdvertisements();
    }
    async createAdvertisement(createAdvertisementInput, file) {
        return this.advertisementsService.create(createAdvertisementInput, file);
    }
    async updateAdvertisement(updateAdvertisementInput, file) {
        const result = await this.awsService.createImage(file, updateAdvertisementInput.id);
        return this.advertisementsService.update(updateAdvertisementInput.id, { ...updateAdvertisementInput, image: result?.Key });
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "getAdvertisement", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "getAdvertisements", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: advertisement_entity_1.Advertisement }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_advertisement_input_1.CreateAdvertisementInput, Object]),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "createAdvertisement", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: advertisement_entity_1.Advertisement }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_advertisement_input_1.UpdateAdvertisementInput, Object]),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "updateAdvertisement", null);
AdvertisementsController = __decorate([
    (0, common_1.Controller)('advertisements'),
    __metadata("design:paramtypes", [advertisements_service_1.AdvertisementsService,
        aws_service_1.AwsService])
], AdvertisementsController);
exports.AdvertisementsController = AdvertisementsController;
//# sourceMappingURL=advertisements.controller.js.map