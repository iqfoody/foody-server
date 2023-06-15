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
exports.TransactionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const transactions_service_1 = require("./transactions.service");
const transaction_entity_1 = require("./entities/transaction.entity");
const create_transaction_input_1 = require("./dto/create-transaction.input");
const update_transaction_input_1 = require("./dto/update-transaction.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_factory_1 = require("../ability/ability.factory");
const ability_decorator_1 = require("../ability/ability.decorator");
const limitEntity_1 = require("../constants/limitEntity");
const transactionsResponse_entity_1 = require("./entities/transactionsResponse.entity");
const reset_admin_wallet_input_1 = require("../admins/dto/reset-admin-wallet.input");
let TransactionsResolver = class TransactionsResolver {
    transactionsService;
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    createTransaction(createTransactionInput, context) {
        return this.transactionsService.create({ ...createTransactionInput, admin: context.req.user._id }, context.req.user.type === "Admin" ? true : false);
    }
    findAll(limitEntity) {
        return this.transactionsService.findAll(limitEntity);
    }
    findAmount(limitEntity) {
        return this.transactionsService.findAmount(limitEntity);
    }
    findPoints(limitEntity) {
        return this.transactionsService.findPoints(limitEntity);
    }
    findAmountUser(limitEntity) {
        return this.transactionsService.findAmountUser(limitEntity);
    }
    findAmountDriver(limitEntity) {
        return this.transactionsService.findAmountDriver(limitEntity);
    }
    findAllAdmin(limitEntity) {
        return this.transactionsService.findAllAdmin(limitEntity);
    }
    findAmountAdmin(limitEntity) {
        return this.transactionsService.findAmountAdmin(limitEntity);
    }
    findPointsAdmin(limitEntity) {
        return this.transactionsService.findPointsAdmin(limitEntity);
    }
    findPointsUser(limitEntity) {
        return this.transactionsService.findPointsUser(limitEntity);
    }
    findOne(id) {
        return this.transactionsService.findOne(id);
    }
    updateTransaction(updateTransactionInput) {
        return this.transactionsService.update(updateTransactionInput.id, updateTransactionInput);
    }
    resetAdminWallet(resetAdminWallet, context) {
        return this.transactionsService.resetAdmin(context.req.user._id, resetAdminWallet);
    }
    removeTransaction(id) {
        return this.transactionsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => transaction_entity_1.Transaction),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('createTransactionInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_input_1.CreateTransactionInput, Object]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "createTransaction", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'transactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'amountTransactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findAmount", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'pointsTransactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findPoints", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'amountUserTransactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findAmountUser", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'amountDriverTransactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findAmountDriver", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'adminTransactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findAllAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'amountAdminTransactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findAmountAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'pointsAdminTransactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findPointsAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => transactionsResponse_entity_1.TransactionResponse, { name: 'pointsUserTransactions' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('limitEntity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [limitEntity_1.LimitEntity]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findPointsUser", null);
__decorate([
    (0, graphql_1.Query)(() => transaction_entity_1.Transaction, { name: 'transaction' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => transaction_entity_1.Transaction),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('updateTransactionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_transaction_input_1.UpdateTransactionInput]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "updateTransaction", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Manage, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('resetAdminWallet')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_admin_wallet_input_1.ResetAdminWallet, Object]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "resetAdminWallet", null);
__decorate([
    (0, graphql_1.Mutation)(() => transaction_entity_1.Transaction),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: transaction_entity_1.Transaction }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionsResolver.prototype, "removeTransaction", null);
TransactionsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => transaction_entity_1.Transaction),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsResolver);
exports.TransactionsResolver = TransactionsResolver;
//# sourceMappingURL=transactions.resolver.js.map