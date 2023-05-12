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
exports.DriversController = void 0;
const common_1 = require("@nestjs/common");
const drivers_service_1 = require("./drivers.service");
const aws_service_1 = require("../aws/aws.service");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const ability_factory_1 = require("../ability/ability.factory");
const driver_entity_1 = require("./entities/driver.entity");
const create_driver_input_1 = require("./dto/create-driver.input");
const update_driver_input_1 = require("./dto/update-driver.input");
let DriversController = class DriversController {
    constructor(driverService, awsService) {
        this.driverService = driverService;
        this.awsService = awsService;
    }
    async createDriver(createDriverInput, file) {
        return this.driverService.create(createDriverInput, file);
    }
    async updateDriver(updateDriverInput, file) {
        const result = await this.awsService.createImage(file, updateDriverInput.id);
        return this.driverService.update(updateDriverInput.id, Object.assign(Object.assign({}, updateDriverInput), { image: result === null || result === void 0 ? void 0 : result.Key }));
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: driver_entity_1.Driver }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)('createDriverInput')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_driver_input_1.CreateDriverInput, Object]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "createDriver", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: driver_entity_1.Driver }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)('updateDriverInput')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_driver_input_1.UpdateDriverInput, Object]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "updateDriver", null);
DriversController = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, common_1.Controller)('drivers'),
    __metadata("design:paramtypes", [drivers_service_1.DriversService,
        aws_service_1.AwsService])
], DriversController);
exports.DriversController = DriversController;
//# sourceMappingURL=drivers.controller.js.map