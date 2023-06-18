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
exports.RatesController = void 0;
const common_1 = require("@nestjs/common");
const rates_service_1 = require("./rates.service");
const create_rate_input_1 = require("./dto/create-rate.input");
const firebase_auth_guard_1 = require("../firebase-auth/firebase-auth.guard");
let RatesController = class RatesController {
    ratesService;
    constructor(ratesService) {
        this.ratesService = ratesService;
    }
    async createMeal(createRateInput, context) {
        return this.ratesService.rateDriver({ ...createRateInput, user: context.user });
    }
};
__decorate([
    (0, common_1.Post)('/driver'),
    __param(0, (0, common_1.Body)('createRateInput')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rate_input_1.CreateRateInput, Object]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "createMeal", null);
RatesController = __decorate([
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Controller)('rates'),
    __metadata("design:paramtypes", [rates_service_1.RatesService])
], RatesController);
exports.RatesController = RatesController;
//# sourceMappingURL=rates.controller.js.map