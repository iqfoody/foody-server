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
const admins_service_1 = require("../admins/admins.service");
const users_service_1 = require("../users/users.service");
const wallets_service_1 = require("../wallets/wallets.service");
const orders_service_1 = require("../orders/orders.service");
const mongoose_2 = require("mongoose");
const aws_service_1 = require("../aws/aws.service");
let TransactionsService = class TransactionsService {
    TransactionsModel;
    ordersService;
    adminsService;
    usersService;
    walletsService;
    awsService;
    constructor(TransactionsModel, ordersService, adminsService, usersService, walletsService, awsService) {
        this.TransactionsModel = TransactionsModel;
        this.ordersService = ordersService;
        this.adminsService = adminsService;
        this.usersService = usersService;
        this.walletsService = walletsService;
        this.awsService = awsService;
    }
    async createTransaction(createTransactionInput) {
        let wallet = { _id: '', amount: 0, points: 0 };
        if (createTransactionInput?.user) {
            wallet = await this.walletsService.findUserWallet(createTransactionInput.user);
        }
        else if (createTransactionInput?.driver) {
            wallet = await this.walletsService.findDriverWallet(createTransactionInput.driver);
        }
        if (!wallet)
            throw new common_1.BadRequestException("Sorry, you havn't access to this wallet");
        if (createTransactionInput?.procedure === "Plus") {
            if (createTransactionInput?.type === "Amount") {
                const newAmount = wallet.amount + createTransactionInput.amount;
                await this.walletsService.update(wallet._id, { amount: newAmount });
            }
            else if (createTransactionInput?.type === "Points") {
                const newPoints = wallet.points + createTransactionInput.amount;
                await this.walletsService.update(wallet._id, { points: newPoints });
            }
            else
                throw new common_1.BadRequestException("Sorry, we can't accept this procedure");
        }
        else if (createTransactionInput?.procedure === "Minus") {
            if (createTransactionInput?.type === "Amount") {
                const newAmount = wallet.amount - createTransactionInput.amount >= 0 ? wallet.amount - createTransactionInput.amount : 0;
                await this.walletsService.update(wallet._id, { amount: newAmount });
            }
            else if (createTransactionInput?.type === "Points") {
                const newPoints = wallet.points - createTransactionInput.amount >= 0 ? wallet.points - createTransactionInput.amount : 0;
                await this.walletsService.update(wallet._id, { points: newPoints });
            }
            else
                throw new common_1.BadRequestException("Sorry, we can't accept this procedure");
        }
        else
            throw new common_1.BadRequestException("Sorry, we can't accept this procedure");
        if (createTransactionInput.type === "Amount") {
            await this.TransactionsModel.create({ ...createTransactionInput, previous: wallet.amount });
        }
        else if (createTransactionInput.type === "Points") {
            await this.TransactionsModel.create({ ...createTransactionInput, previous: wallet.points });
        }
        return;
    }
    async findAll(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ user: { $exists: true } }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ user: { $exists: true } });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findPoints(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ $and: [{ type: "Points" }, { user: { $exists: true } }] }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ $and: [{ type: "Points" }, { user: { $exists: true } }] });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAmount(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ $and: [{ type: "Amount" }, { user: { $exists: true } }] }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ $and: [{ type: "Amount" }, { user: { $exists: true } }] });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findPointsUser(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ $and: [{ user: limitEntity?.user }, { type: "Points" }] }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ $and: [{ user: limitEntity?.user }, { type: "Points" }] });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAmountUser(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ $and: [{ user: limitEntity?.user }, { type: "Amount" }] }).populate({ path: "user", select: { name: 1, image: 1 } }).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ $and: [{ user: limitEntity?.user }, { type: "Amount" }] });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAmountDriver(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ $and: [{ driver: limitEntity?.user }, { type: "Amount" }] }).populate([{ path: "user", select: { name: 1, image: 1 } }, { path: "admin", select: { name: 1, image: 1 } }]).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ $and: [{ driver: limitEntity?.user }, { type: "Amount" }] });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
            if (single.admin?.image)
                single.admin.image = this.awsService.getUrl(single.admin.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAllAdmin(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ admin: { $exists: true } }).populate([{ path: "user", select: { name: 1, image: 1 } }, { path: "driver", select: { name: 1, image: 1 } }]).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ admin: { $exists: true } });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAmountAdmin(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ $and: [{ admin: limitEntity?.user }, { type: "Amount" }] }).populate([{ path: "user", select: { name: 1, image: 1 } }, { path: "driver", select: { name: 1, image: 1 } }]).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ $and: [{ admin: limitEntity?.user }, { type: "Amount" }] });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
            if (single.driver?.image)
                single.driver.image = this.awsService.getUrl(single.driver.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findPointsAdmin(limitEntity) {
        const skipIndex = limitEntity.page * limitEntity.page;
        const transactions = await this.TransactionsModel.find({ $and: [{ admin: limitEntity?.user }, { type: "Points" }] }).populate([{ path: "user", select: { name: 1, image: 1 } }, { path: "driver", select: { name: 1, image: 1 } }]).sort({ _id: -1 }).limit(limitEntity.limit).skip(skipIndex);
        const total = await this.TransactionsModel.countDocuments({ $and: [{ admin: limitEntity?.user }, { type: "Points" }] });
        for (const single of transactions) {
            if (single.user?.image)
                single.user.image = this.awsService.getUrl(single.user.image);
        }
        return { data: transactions, pages: Math.ceil(total / limitEntity.limit) };
    }
    async create(createTransactionInput, admin) {
        let transaction;
        let wallet = { _id: '', amount: 0, points: 0 };
        let adminWallet = { _id: '', amount: 0, points: 0 };
        if (createTransactionInput?.user) {
            wallet = await this.walletsService.findUserWallet(createTransactionInput.user);
        }
        else if (createTransactionInput?.driver) {
            wallet = await this.walletsService.findDriverWallet(createTransactionInput.driver);
        }
        if (!wallet)
            throw new common_1.BadRequestException("Sorry, you havn't access to this wallet");
        if (!admin) {
            adminWallet = await this.walletsService.findAdminWallet(createTransactionInput.admin);
            if (!adminWallet)
                throw new common_1.BadRequestException("Sorry, you havn't access to admin wallet");
        }
        if (createTransactionInput.procedure) {
            if (createTransactionInput.type === "Amount") {
                const newAmount = wallet.amount + createTransactionInput.amount;
                await this.walletsService.update(wallet._id, { amount: newAmount });
                if (createTransactionInput?.user && !admin) {
                    const newAdminAmount = adminWallet.amount + createTransactionInput.amount;
                    await this.walletsService.update(adminWallet._id, { amount: newAdminAmount });
                }
            }
            else if (createTransactionInput?.type === "Points") {
                const newPoints = wallet.points + createTransactionInput.amount;
                await this.walletsService.update(wallet._id, { points: newPoints });
                if (createTransactionInput?.user && !admin) {
                    const newAdminPoints = adminWallet.points + createTransactionInput.amount;
                    await this.walletsService.update(adminWallet._id, { points: newAdminPoints });
                }
            }
            else
                throw new common_1.BadRequestException("Sorry, we can't accept this procedure");
        }
        else
            throw new common_1.BadRequestException("Sorry, we can't accept this procedure");
        if (createTransactionInput.type === "Amount") {
            transaction = await this.TransactionsModel.create({ ...createTransactionInput, previous: wallet.amount, state: "Completed" });
        }
        else if (createTransactionInput.type === "Points") {
            transaction = await this.TransactionsModel.create({ ...createTransactionInput, previous: wallet.points, state: "Completed" });
        }
        const result = await transaction.populate([{ path: "user", select: { name: 1, phoneNumber: 1, image: 1 } }, { path: "driver", select: { name: 1, phoneNumber: 1, image: 1 } }, { path: "admin", select: { name: 1, phoneNumber: 1, image: 1 } }]);
        if (result?.user?.image)
            result.user.image = this.awsService.getUrl(result.user.image);
        if (result?.driver?.image)
            result.driver.image = this.awsService.getUrl(result.driver.image);
        if (result?.admin?.image)
            result.admin.image = this.awsService.getUrl(result.admin.image);
        return result;
    }
    async resetAdmin(admin, resetAdminWallet) {
        const wallet = await this.walletsService.resetAdminWallet(resetAdminWallet);
        if (resetAdminWallet.type === "Amount") {
            if (wallet.amount === 0)
                return "Success";
            await this.TransactionsModel.create({ admin, type: resetAdminWallet.type, amount: 0, previous: wallet.amount, procedure: "Minus", state: "Completed", description: "reset admin wallet from management" });
        }
        else {
            if (wallet.points === 0)
                return "Success";
            await this.TransactionsModel.create({ admin, type: resetAdminWallet.type, amount: 0, previous: wallet.points, procedure: "Minus", state: "Completed", description: "reset admin wallet from management" });
        }
        return "Success";
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
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => orders_service_1.OrdersService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => admins_service_1.AdminsService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => wallets_service_1.WalletsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        orders_service_1.OrdersService,
        admins_service_1.AdminsService,
        users_service_1.UsersService,
        wallets_service_1.WalletsService,
        aws_service_1.AwsService])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map