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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const create_order_input_1 = require("./dto/create-order.input");
const order_entity_1 = require("./entities/order.entity");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const create_rate_order_input_1 = require("./dto/create-rate-order.input");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async getOrderes(req, state) {
        return this.ordersService.findOrders(req.user._id, state);
    }
    async createOrder(createOrderInput, req) {
        return this.ordersService.createOrder({ ...createOrderInput, user: req.user._id });
    }
    async ratingOrder(id, createRateOrderInput, req) {
        return this.ordersService.rateOrder({ user: req.user._id, order: id, rate: createRateOrderInput.rate, description: createRateOrderInput?.description });
    }
    async cancelOrder(id, req) {
        return this.ordersService.cancelOrder(id, req.user._id);
    }
    async inDeliveryOrder(id, req) {
        return this.ordersService.inDeliveryOrder(id, req.user._id);
    }
    async completeOrder(id, recievedPrice, req) {
        return this.ordersService.completeOrder(id, req.user._id, recievedPrice);
    }
    async getOrder(id, req) {
        return this.ordersService.findOrder(id, req.user._id);
    }
    async deleteOrder(id, req) {
        return this.ordersService.deleteOrder(id, req.user._id);
    }
};
__decorate([
    (0, common_1.Get)('/history'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Info, subject: order_entity_1.Order }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderes", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Add, subject: order_entity_1.Order }),
    __param(0, (0, common_1.Body)('createOrderInput')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_input_1.CreateOrderInput, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('/rate/:id'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Edit, subject: order_entity_1.Order }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('createRateOrderInput')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_rate_order_input_1.CreateRateOrderInput, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "ratingOrder", null);
__decorate([
    (0, common_1.Post)('/cancel/:id'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Edit, subject: order_entity_1.Order }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Post)('/indelivery/:id'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Complete, subject: order_entity_1.Order }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "inDeliveryOrder", null);
__decorate([
    (0, common_1.Post)('/completed/:id'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Complete, subject: order_entity_1.Order }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('recievedPrice')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "completeOrder", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Info, subject: order_entity_1.Order }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Remove, subject: order_entity_1.Order }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deleteOrder", null);
OrdersController = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map