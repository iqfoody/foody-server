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
exports.AddressesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const addresses_service_1 = require("./addresses.service");
const address_entity_1 = require("./entities/address.entity");
const create_address_input_1 = require("./dto/create-address.input");
const update_address_input_1 = require("./dto/update-address.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const mongoose_1 = require("mongoose");
let AddressesResolver = class AddressesResolver {
    addressesService;
    constructor(addressesService) {
        this.addressesService = addressesService;
    }
    createAddress(createAddressInput) {
        return this.addressesService.create(createAddressInput);
    }
    findAll(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't address with this id");
        return this.addressesService.findAll(id);
    }
    findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't address with this id");
        return this.addressesService.findOne(id);
    }
    updateAddress(updateAddressInput) {
        if (!(0, mongoose_1.isValidObjectId)(updateAddressInput?.id))
            throw new common_1.BadRequestException("There isn't address with this id");
        return this.addressesService.update(updateAddressInput.id, updateAddressInput);
    }
    removeAddress(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't address with this id");
        return this.addressesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => address_entity_1.Address),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: "User" }),
    __param(0, (0, graphql_1.Args)('createAddressInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_input_1.CreateAddressInput]),
    __metadata("design:returntype", void 0)
], AddressesResolver.prototype, "createAddress", null);
__decorate([
    (0, graphql_1.Query)(() => [address_entity_1.Address], { name: 'addresses' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "User" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => address_entity_1.Address, { name: 'address' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "User" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "User" }),
    __param(0, (0, graphql_1.Args)('updateAddressInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_address_input_1.UpdateAddressInput]),
    __metadata("design:returntype", void 0)
], AddressesResolver.prototype, "updateAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: "User" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressesResolver.prototype, "removeAddress", null);
AddressesResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => address_entity_1.Address),
    __metadata("design:paramtypes", [addresses_service_1.AddressesService])
], AddressesResolver);
exports.AddressesResolver = AddressesResolver;
//# sourceMappingURL=addresses.resolver.js.map