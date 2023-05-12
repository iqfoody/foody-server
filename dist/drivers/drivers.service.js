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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const aws_service_1 = require("../aws/aws.service");
let DriversService = class DriversService {
    constructor(DriversModel, awsService) {
        this.DriversModel = DriversModel;
        this.awsService = awsService;
    }
    async login(loginInput) {
        const driver = await this.DriversModel.login(loginInput);
        if (driver === null || driver === void 0 ? void 0 : driver.image)
            driver.image = this.awsService.getUrl(driver === null || driver === void 0 ? void 0 : driver.image);
        return driver;
    }
    async create(createDriverInput, file) {
        const driver = new this.DriversModel(createDriverInput);
        if (file) {
            const result = await this.awsService.createImage(file, driver._id);
            driver.image = result === null || result === void 0 ? void 0 : result.Key;
        }
        await driver.save();
        if (driver === null || driver === void 0 ? void 0 : driver.image)
            driver.image = this.awsService.getUrl(driver.image);
        return driver;
    }
    async findAll() {
        const drivers = await this.DriversModel.find();
        for (const driver of drivers) {
            if (driver === null || driver === void 0 ? void 0 : driver.image)
                driver.image = this.awsService.getUrl(driver === null || driver === void 0 ? void 0 : driver.image);
        }
        return drivers;
    }
    async findOne(id) {
        const driver = await this.DriversModel.findById(id);
        if (driver === null || driver === void 0 ? void 0 : driver.image)
            driver.image = this.awsService.getUrl(driver === null || driver === void 0 ? void 0 : driver.image);
        return driver;
    }
    async info(id) {
        const driver = await this.DriversModel.findById(id);
        if (driver === null || driver === void 0 ? void 0 : driver.image)
            driver.image = this.awsService.getUrl(driver === null || driver === void 0 ? void 0 : driver.image);
        return driver;
    }
    async findByPhoneNumber(phoneNumber) {
        const driver = await this.DriversModel.findOne({ phoneNumber });
        if (driver === null || driver === void 0 ? void 0 : driver.image)
            driver.image = this.awsService.getUrl(driver === null || driver === void 0 ? void 0 : driver.image);
        return driver;
    }
    async updateAny(id, updateAdminInput) {
        await this.DriversModel.findByIdAndUpdate(id, updateAdminInput);
        return;
    }
    async update(id, updateDriverInput) {
        let E0011 = await this.findByPhoneNumber(updateDriverInput.phoneNumber);
        if (E0011 && id != E0011._id)
            throw new Error('phoneNumber E0011');
        if (updateDriverInput.image) {
            const { image } = await this.DriversModel.findOne({ _id: updateDriverInput.id }, { image: 1, _id: 0 });
            if (image)
                this.awsService.removeImage(image);
        }
        await this.DriversModel.findByIdAndUpdate(id, updateDriverInput);
        return { message: "account updated" };
    }
    async state(stateInput) {
        await this.DriversModel.findOneAndUpdate({ $and: [{ _id: stateInput.id }, { type: { $ne: "Admin" } }] }, stateInput);
        return { message: "success" };
    }
    async logout(id) {
        await this.DriversModel.findByIdAndUpdate(id, { refreshToken: null });
    }
    async refresh(id, token) {
        const driver = await this.DriversModel.findById(id);
        if (!driver)
            throw new common_1.NotFoundException('Access Denied');
        const isMatched = driver.compareToken(token);
        if (!isMatched)
            throw new common_1.ForbiddenException('Access Denied');
        return driver;
    }
    async remove(_id) {
        const { image } = await this.DriversModel.findOne({ _id }, { image: 1, _id: 0 });
        await this.DriversModel.findByIdAndDelete(_id);
        if (image)
            this.awsService.removeImage(image);
        return { message: "success" };
    }
};
DriversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Drivers")),
    __metadata("design:paramtypes", [Object, aws_service_1.AwsService])
], DriversService);
exports.DriversService = DriversService;
//# sourceMappingURL=drivers.service.js.map