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
exports.RatesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const rates_service_1 = require("./rates.service");
const rate_entity_1 = require("./entities/rate.entity");
const create_rate_input_1 = require("./dto/create-rate.input");
const update_rate_input_1 = require("./dto/update-rate.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
let RatesResolver = class RatesResolver {
    constructor(ratesService) {
        this.ratesService = ratesService;
    }
    createRate(createRateInput) {
        return this.ratesService.create(createRateInput);
    }
    findAll() {
        return this.ratesService.findAll();
    }
    findOne(id) {
        return this.ratesService.findOne(id);
    }
    updateRate(updateRateInput) {
        return this.ratesService.update(updateRateInput.id, updateRateInput);
    }
    removeRate(id) {
        return this.ratesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => rate_entity_1.Rate),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: rate_entity_1.Rate }),
    __param(0, (0, graphql_1.Args)('createRateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rate_input_1.CreateRateInput]),
    __metadata("design:returntype", void 0)
], RatesResolver.prototype, "createRate", null);
__decorate([
    (0, graphql_1.Query)(() => [rate_entity_1.Rate], { name: 'rates' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: rate_entity_1.Rate }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => rate_entity_1.Rate, { name: 'rate' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: rate_entity_1.Rate }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => rate_entity_1.Rate),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: rate_entity_1.Rate }),
    __param(0, (0, graphql_1.Args)('updateRateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_rate_input_1.UpdateRateInput]),
    __metadata("design:returntype", void 0)
], RatesResolver.prototype, "updateRate", null);
__decorate([
    (0, graphql_1.Mutation)(() => rate_entity_1.Rate),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: rate_entity_1.Rate }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatesResolver.prototype, "removeRate", null);
RatesResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => rate_entity_1.Rate),
    __metadata("design:paramtypes", [rates_service_1.RatesService])
], RatesResolver);
exports.RatesResolver = RatesResolver;
//# sourceMappingURL=rates.resolver.js.map