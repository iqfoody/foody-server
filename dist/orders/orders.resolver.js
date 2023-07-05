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
exports.OrdersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const orders_service_1 = require("./orders.service");
const order_entity_1 = require("./entities/order.entity");
const create_order_input_1 = require("./dto/create-order.input");
const update_order_input_1 = require("./dto/update-order.input");
const limitEntity_1 = require("../constants/limitEntity");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const ordersResponse_entity_1 = require("./entities/ordersResponse.entity");
const homeResponse_entity_1 = require("../constants/homeResponse.entity");
const reportsResults_entity_1 = require("../constants/reportsResults.entity");
const state_input_1 = require("../constants/state.input");
const mongoose_1 = require("mongoose");
let OrdersResolver = class OrdersResolver {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    createOrder(createOrderInput) {
        return this.ordersService.create(createOrderInput);
    }
    findAll(limitEntity) {
        return this.ordersService.findAll(limitEntity);
    }
    homeValues() {
        return this.ordersService.home();
    }
    findAllUserOrders(limitEntity) {
        if (!(0, mongoose_1.isValidObjectId)(limitEntity?.user))
            throw new common_1.BadRequestException("There isn't order with this id");
        return this.ordersService.findUserOrders(limitEntity);
    }
    findAllDriverOrders(limitEntity) {
        if (!(0, mongoose_1.isValidObjectId)(limitEntity?.user))
            throw new common_1.BadRequestException("There isn't order with this id");
        return this.ordersService.findDriverOrders(limitEntity);
    }
    findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        return this.ordersService.findOne(id);
    }
    updateOrder(updateOrderInput) {
        if (!(0, mongoose_1.isValidObjectId)(updateOrderInput?.id))
            throw new common_1.BadRequestException("There isn't order with this id");
        return this.ordersService.update(updateOrderInput.id, updateOrderInput);
    }
    stateOrder(stateInput) {
        if (!(0, mongoose_1.isValidObjectId)(stateInput?.id))
            throw new common_1.BadRequestException("There isn't order with this id");
        return this.ordersService.state(stateInput);
    }
    removeOrder(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't order with this id");
        return this.ordersService.remove(id);
    }
    profitsReports(date) {
        return this.ordersService.profitsReport(date);
    }
    ordersReports(date) {
        return this.ordersService.ordersReport(date);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => order_entity_1.Order),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('createOrderInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_input_1.CreateOrderInput]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "createOrder", null);
__decorate([
    (0, graphql_1.Query)(() => ordersResponse_entity_1.OrdersResponse, { name: 'orders' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('limitEntity', { type: () => limitEntity_1.LimitEntity })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => homeResponse_entity_1.HomeResponse),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Home" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "homeValues", null);
__decorate([
    (0, graphql_1.Query)(() => ordersResponse_entity_1.OrdersResponse, { name: 'ordersUser' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('limitEntity', { type: () => limitEntity_1.LimitEntity })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "findAllUserOrders", null);
__decorate([
    (0, graphql_1.Query)(() => ordersResponse_entity_1.OrdersResponse, { name: 'ordersDriver' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('limitEntity', { type: () => limitEntity_1.LimitEntity })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "findAllDriverOrders", null);
__decorate([
    (0, graphql_1.Query)(() => order_entity_1.Order, { name: 'order' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_entity_1.Order),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('updateOrderInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_order_input_1.UpdateOrderInput]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "updateOrder", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "stateOrder", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "removeOrder", null);
__decorate([
    (0, graphql_1.Query)(() => reportsResults_entity_1.Months, { name: 'profitsReport' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('date', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "profitsReports", null);
__decorate([
    (0, graphql_1.Query)(() => reportsResults_entity_1.Months, { name: 'ordersReport' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Order" }),
    __param(0, (0, graphql_1.Args)('date', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "ordersReports", null);
OrdersResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => order_entity_1.Order),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersResolver);
exports.OrdersResolver = OrdersResolver;
//# sourceMappingURL=orders.resolver.js.map