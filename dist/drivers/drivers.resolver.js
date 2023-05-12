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
exports.DriversResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const drivers_service_1 = require("./drivers.service");
const driver_entity_1 = require("./entities/driver.entity");
const create_driver_input_1 = require("./dto/create-driver.input");
const update_driver_input_1 = require("./dto/update-driver.input");
const common_1 = require("@nestjs/common");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const state_input_1 = require("../constants/state.input");
const response_entity_1 = require("../constants/response.entity");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
let DriversResolver = class DriversResolver {
    constructor(driversService) {
        this.driversService = driversService;
    }
    createDriver(createDriverInput) {
        return this.driversService.create(createDriverInput, null);
    }
    findAll() {
        return this.driversService.findAll();
    }
    findOne(id) {
        return this.driversService.findOne(id);
    }
    updateDriver(updateDriverInput) {
        return this.driversService.update(updateDriverInput.id, updateDriverInput);
    }
    stateDriver(stateInput) {
        return this.driversService.state(stateInput);
    }
    removeDriver(id) {
        return this.driversService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => driver_entity_1.Driver),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: driver_entity_1.Driver }),
    __param(0, (0, graphql_1.Args)('createDriverInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_driver_input_1.CreateDriverInput]),
    __metadata("design:returntype", void 0)
], DriversResolver.prototype, "createDriver", null);
__decorate([
    (0, graphql_1.Query)(() => [driver_entity_1.Driver], { name: 'drivers' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: driver_entity_1.Driver }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DriversResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => driver_entity_1.Driver, { name: 'driver' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: driver_entity_1.Driver }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DriversResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => response_entity_1.Response),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: driver_entity_1.Driver }),
    __param(0, (0, graphql_1.Args)('updateDriverInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_driver_input_1.UpdateDriverInput]),
    __metadata("design:returntype", void 0)
], DriversResolver.prototype, "updateDriver", null);
__decorate([
    (0, graphql_1.Mutation)(() => response_entity_1.Response),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.State, subject: driver_entity_1.Driver }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", void 0)
], DriversResolver.prototype, "stateDriver", null);
__decorate([
    (0, graphql_1.Mutation)(() => response_entity_1.Response),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: driver_entity_1.Driver }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DriversResolver.prototype, "removeDriver", null);
DriversResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => driver_entity_1.Driver),
    __metadata("design:paramtypes", [drivers_service_1.DriversService])
], DriversResolver);
exports.DriversResolver = DriversResolver;
//# sourceMappingURL=drivers.resolver.js.map