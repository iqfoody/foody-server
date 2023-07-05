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
const create_order_input_1 = require("./dto/create-order.input");
const create_rate_order_input_1 = require("./dto/create-rate-order.input");
const firebase_auth_guard_1 = require("../firebase-auth/firebase-auth.guard");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async getOrderes(req, state) {
        return this.ordersService.findOrders(req.user, state);
    }
    async createOrder(createOrderInput, req) {
        return this.ordersService.createOrder({ ...createOrderInput, user: req.user });
    }
    async ratingOrder(id, createRateOrderInput, req) {
        return this.ordersService.rateOrder({ user: req.user, order: id, rate: createRateOrderInput.rate, description: createRateOrderInput?.description });
    }
    async cancelOrder(id, req) {
        return this.ordersService.cancelOrder(id, req.user);
    }
    async inDeliveryOrder(id, req) {
        return this.ordersService.inDeliveryOrder(id, req.user);
    }
    async completeOrder(id, recievedPrice, req) {
        return this.ordersService.completeOrder(id, req.user, recievedPrice);
    }
    async getOrderesDriver(req, state) {
        return this.ordersService.findOrdersDriver(req.user, state);
    }
    async getOrder(id, req) {
        return this.ordersService.findOrder(id, req.user);
    }
    async deleteOrder(id, req) {
        return this.ordersService.deleteOrder(id, req.user);
    }
};
__decorate([
    (0, common_1.Get)('/history'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderes", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)('createOrderInput')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_input_1.CreateOrderInput, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('/rate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('createRateOrderInput')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_rate_order_input_1.CreateRateOrderInput, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "ratingOrder", null);
__decorate([
    (0, common_1.Post)('/cancel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Post)('/indelivery/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "inDeliveryOrder", null);
__decorate([
    (0, common_1.Post)('/completed/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('recievedPrice')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "completeOrder", null);
__decorate([
    (0, common_1.Get)('/driver/history'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderesDriver", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deleteOrder", null);
OrdersController = __decorate([
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map