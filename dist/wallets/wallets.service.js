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
exports.WalletsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let WalletsService = class WalletsService {
    WalletsModel;
    constructor(WalletsModel) {
        this.WalletsModel = WalletsModel;
    }
    create(createWalletInput) {
        return this.WalletsModel.create(createWalletInput);
    }
    findAll() {
        return this.WalletsModel.find();
    }
    findOne(id) {
        return this.WalletsModel.findById(id);
    }
    findUserWallet(user) {
        return this.WalletsModel.findOne({ user });
    }
    findDriverWallet(driver) {
        return this.WalletsModel.findOne({ driver });
    }
    findAdminWallet(admin) {
        return this.WalletsModel.findOne({ admin });
    }
    async resetAdminWallet(resetAdminWallet) {
        let wallet = { _id: '', amount: 0, points: 0 };
        if (resetAdminWallet.type === "Amount") {
            wallet = await this.WalletsModel.findOneAndUpdate({ admin: resetAdminWallet.admin }, { amount: 0 });
        }
        else if (resetAdminWallet.type === "Points") {
            wallet = await this.WalletsModel.findOneAndUpdate({ admin: resetAdminWallet.admin }, { points: 0 });
        }
        else
            throw new common_1.BadRequestException("Can't complete this procedure");
        return wallet;
    }
    async update(id, updateWalletInput) {
        await this.WalletsModel.findByIdAndUpdate(id, updateWalletInput);
        return "Success";
    }
    async remove(id) {
        await this.WalletsModel.findByIdAndDelete(id);
        return "Success";
    }
    async removeUser(user) {
        await this.WalletsModel.findOneAndDelete({ user });
        return "Success";
    }
    async removeDriver(driver) {
        await this.WalletsModel.findOneAndDelete({ driver });
        return "Success";
    }
    async removeAdmin(admin) {
        await this.WalletsModel.findOneAndDelete({ admin });
        return "Success";
    }
};
WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Wallets")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WalletsService);
exports.WalletsService = WalletsService;
//# sourceMappingURL=wallets.service.js.map