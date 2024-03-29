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
exports.AddressesController = void 0;
const common_1 = require("@nestjs/common");
const addresses_service_1 = require("./addresses.service");
const create_address_input_1 = require("./dto/create-address.input");
const update_address_input_1 = require("./dto/update-address.input");
const firebase_auth_guard_1 = require("../firebase-auth/firebase-auth.guard");
let AddressesController = class AddressesController {
    addressesService;
    constructor(addressesService) {
        this.addressesService = addressesService;
    }
    async getAddresses(req) {
        return this.addressesService.findAddresses(req.user);
    }
    async createAddress(createAddressInput, req) {
        return this.addressesService.create({ ...createAddressInput, user: req.user });
    }
    async getAddress(id, req) {
        return this.addressesService.findAddress(id, req.user);
    }
    async updateAddress(id, updateAddressInput, req) {
        return this.addressesService.updateAddress({ ...updateAddressInput, id }, req.user);
    }
    async deleteAddress(id, req) {
        return this.addressesService.removeAddress(id, req.user);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "getAddresses", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)('createAddressInput')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_input_1.CreateAddressInput, Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "createAddress", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "getAddress", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('updateAddressInput')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_address_input_1.UpdateAddressInput, Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "deleteAddress", null);
AddressesController = __decorate([
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Controller)('addresses'),
    __metadata("design:paramtypes", [addresses_service_1.AddressesService])
], AddressesController);
exports.AddressesController = AddressesController;
//# sourceMappingURL=addresses.controller.js.map