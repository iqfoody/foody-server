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
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let AddressesService = class AddressesService {
    AddressesModel;
    usersService;
    constructor(AddressesModel, usersService) {
        this.AddressesModel = AddressesModel;
        this.usersService = usersService;
    }
    create(createAddressInput) {
        return this.AddressesModel.create(createAddressInput);
    }
    findAll(user) {
        return this.AddressesModel.find({ user });
    }
    findOne(id) {
        return this.AddressesModel.findById(id);
    }
    async update(id, updateAddressInput) {
        await this.AddressesModel.findByIdAndUpdate(id, updateAddressInput);
        return "Success";
    }
    async remove(id) {
        await this.AddressesModel.findByIdAndDelete(id);
        return "Success";
    }
    async findAddresses(phoneNumber) {
        const { _id } = await this.usersService.findId(phoneNumber);
        return this.AddressesModel.find({ user: _id }).select(["-__v", "-user"]);
    }
    async findAddress(id, phoneNumber) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't address with this id");
        const { _id } = await this.usersService.findId(phoneNumber);
        return this.AddressesModel.findOne({ $and: [{ _id: id }, { user: _id }] }).select(["-__v", "-user"]);
    }
    async updateAddress(updateAddressInput, phoneNumber) {
        if (!(0, mongoose_2.isValidObjectId)(updateAddressInput?.id))
            throw new common_1.BadRequestException("There isn't address with this id");
        const { _id } = await this.usersService.findId(phoneNumber);
        await this.AddressesModel.findOneAndUpdate({ $and: [{ _id: updateAddressInput.id }, { user: _id }] }, updateAddressInput);
        return "Success";
    }
    async removeAddress(id, phoneNumber) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't address with this id");
        const { _id } = await this.usersService.findId(phoneNumber);
        await this.AddressesModel.findOneAndDelete({ $and: [{ _id: id }, { user: _id }] });
        return "Success";
    }
    async clean(phoneNumber) {
        const { _id } = await this.usersService.findId(phoneNumber);
        await this.AddressesModel.deleteMany({ user: _id });
        return "Success";
    }
};
AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Addresses")),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], AddressesService);
exports.AddressesService = AddressesService;
//# sourceMappingURL=addresses.service.js.map