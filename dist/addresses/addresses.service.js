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
let AddressesService = class AddressesService {
    constructor(AddressesModel) {
        this.AddressesModel = AddressesModel;
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
    findAddresses(user) {
        return this.AddressesModel.find({ user });
    }
    findAddress(id, user) {
        return this.AddressesModel.findOne({ $and: [{ _id: id }, { user }] });
    }
    async updateAddress(id, updateAddressInput, user) {
        await this.AddressesModel.findOneAndUpdate({ $and: [{ _id: id }, { user }] }, updateAddressInput);
        return "Success";
    }
    async removeAddress(id, user) {
        await this.AddressesModel.findOneAndDelete({ $and: [{ _id: id }, { user }] });
        return "Success";
    }
};
AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Addresses")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AddressesService);
exports.AddressesService = AddressesService;
//# sourceMappingURL=addresses.service.js.map