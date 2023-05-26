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
exports.AdvertisementsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const advertisements_service_1 = require("./advertisements.service");
const advertisement_entity_1 = require("./entities/advertisement.entity");
const update_advertisement_input_1 = require("./dto/update-advertisement.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const position_input_1 = require("../constants/position.input");
const state_input_1 = require("../constants/state.input");
let AdvertisementsResolver = class AdvertisementsResolver {
    advertisementsService;
    constructor(advertisementsService) {
        this.advertisementsService = advertisementsService;
    }
    findAll() {
        return this.advertisementsService.findAll();
    }
    findOne(id) {
        return this.advertisementsService.findOne(id);
    }
    updateAdvertisement(updateAdvertisementInput) {
        return this.advertisementsService.update(updateAdvertisementInput.id, updateAdvertisementInput);
    }
    positionAdvertisement(updatePositionInput) {
        return this.advertisementsService.position(updatePositionInput);
    }
    stateAdvertisement(stateInput) {
        return this.advertisementsService.state(stateInput);
    }
    removeAdvertisement(id) {
        return this.advertisementsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [advertisement_entity_1.Advertisement], { name: 'advertisements' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: advertisement_entity_1.Advertisement }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdvertisementsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => advertisement_entity_1.Advertisement, { name: 'advertisement' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: advertisement_entity_1.Advertisement }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdvertisementsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: advertisement_entity_1.Advertisement }),
    __param(0, (0, graphql_1.Args)('updateAdvertisementInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_advertisement_input_1.UpdateAdvertisementInput]),
    __metadata("design:returntype", void 0)
], AdvertisementsResolver.prototype, "updateAdvertisement", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: advertisement_entity_1.Advertisement }),
    __param(0, (0, graphql_1.Args)('updatePositionInput', { type: () => [position_input_1.UpdatePositionInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], AdvertisementsResolver.prototype, "positionAdvertisement", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: advertisement_entity_1.Advertisement }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", void 0)
], AdvertisementsResolver.prototype, "stateAdvertisement", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: advertisement_entity_1.Advertisement }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdvertisementsResolver.prototype, "removeAdvertisement", null);
AdvertisementsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => advertisement_entity_1.Advertisement),
    __metadata("design:paramtypes", [advertisements_service_1.AdvertisementsService])
], AdvertisementsResolver);
exports.AdvertisementsResolver = AdvertisementsResolver;
//# sourceMappingURL=advertisements.resolver.js.map