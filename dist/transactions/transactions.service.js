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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_service_1 = require("../aws/aws.service");
let TransactionsService = class TransactionsService {
    TransactionsModel;
    awsService;
    constructor(TransactionsModel, awsService) {
        this.TransactionsModel = TransactionsModel;
        this.awsService = awsService;
    }
    async create(createTransactionInput) {
        return this.TransactionsModel.create(createTransactionInput);
    }
    async findAll(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find().populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments();
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findPoints(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ type: "Points" }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ type: "Points" });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAmount(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ type: "Amount" }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ type: "Amount" });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findForUser(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ user: limitEntity?.user }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ user: limitEntity?.user });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findForAdmin(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ admin: limitEntity?.user }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ admin: limitEntity?.user });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    findOne(id) {
        return this.TransactionsModel.findById(id);
    }
    async update(id, updateTransactionInput) {
        await this.TransactionsModel.findByIdAndUpdate(id, updateTransactionInput);
        return "Success";
    }
    async remove(id) {
        await this.TransactionsModel.findByIdAndDelete(id);
        return "Success";
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Transactions")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map