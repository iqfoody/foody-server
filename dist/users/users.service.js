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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcryptjs_1 = require("bcryptjs");
const aws_service_1 = require("../aws/aws.service");
const favorites_service_1 = require("../favorites/favorites.service");
const wallets_service_1 = require("../wallets/wallets.service");
const addresses_service_1 = require("../addresses/addresses.service");
const declearedMonths_1 = require("../constants/declearedMonths");
let UsersService = class UsersService {
    UsersModel;
    awsService;
    favoritesService;
    walletsService;
    addressesService;
    constructor(UsersModel, awsService, favoritesService, walletsService, addressesService) {
        this.UsersModel = UsersModel;
        this.awsService = awsService;
        this.favoritesService = favoritesService;
        this.walletsService = walletsService;
        this.addressesService = addressesService;
    }
    async search(searchUsersInput) {
        const LIMIT = 8;
        const startIndex = (searchUsersInput.page) * LIMIT;
        const search = new RegExp(searchUsersInput.query, 'i');
        const users = await this.UsersModel.find({ $or: [{ email: search }, { name: search }, { phoneNumber: search }] }).limit(LIMIT).skip(startIndex);
        const total = await this.UsersModel.countDocuments();
        for (const user of users) {
            if (user?.image)
                user.image = this.awsService.getUrl(user?.image);
        }
        return { data: users, pages: Math.ceil(total / LIMIT) };
    }
    async findAllUsers(limitEntity) {
        const startIndex = limitEntity.page * limitEntity.limit;
        const users = await this.UsersModel.find().limit(limitEntity.limit).skip(startIndex).sort({ _id: -1 });
        const total = await this.UsersModel.countDocuments();
        for (const user of users) {
            if (user?.image)
                user.image = this.awsService.getUrl(user?.image);
        }
        return { data: users, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAll() {
        const users = await this.UsersModel.find().exec();
        for (const user of users) {
            if (user?.image)
                user.image = this.awsService.getUrl(user?.image);
        }
        return users;
    }
    async findOne(id) {
        const user = await this.UsersModel.findById(id).populate("wallet");
        if (user?.image)
            user.image = this.awsService.getUrl(user?.image);
        return user;
    }
    async createUser(createUserInput) {
        if (createUserInput?.password?.length < 6)
            throw new common_1.BadRequestException("password E0004");
        const phoneNumber = await this.findByPhoneNumber(createUserInput.phoneNumber);
        if (phoneNumber) {
            throw new common_1.NotAcceptableException("phoneNumber E0011");
        }
        else if (createUserInput?.email) {
            const email = await this.findByEmail(createUserInput.email);
            if (email)
                throw new common_1.NotAcceptableException("email E0011");
        }
        const user = new this.UsersModel(createUserInput);
        const wallet = await this.walletsService.create({ user: user._id });
        user.wallet = wallet._id;
        if (createUserInput?.image) {
            const result = await this.awsService.createImage(createUserInput.image, user._id);
            user.image = result?.Key;
        }
        await user.save();
        await this.favoritesService.create({ user: user._id });
        if (user?.image)
            user.image = this.awsService.getUrl(user.image);
        const { _id, name, phoneNumber: phone, image, type, state, createdAt } = user;
        return { _id, name, phoneNumber: phone, image, type, state, createdAt, email: null };
    }
    async updateUser(id, updateUserInput) {
        if (updateUserInput?.phoneNumber) {
            let E0011 = await this.findByPhoneNumber(updateUserInput.phoneNumber);
            if (E0011 && id != E0011._id)
                throw new common_1.BadRequestException('phoneNumber E0011');
        }
        if (updateUserInput?.email) {
            let E0002 = await this.findByEmail(updateUserInput.email);
            if (E0002 && id != E0002._id)
                throw new common_1.BadRequestException('email E0002');
        }
        if (updateUserInput?.image) {
            const { image } = await this.UsersModel.findOne({ _id: id }, { image: 1, _id: 0 });
            if (image)
                this.awsService.removeImage(image);
            const result = await this.awsService.createImage(updateUserInput.image, id);
            await this.UsersModel.findByIdAndUpdate(id, { ...updateUserInput, image: result?.Key });
        }
        else {
            await this.UsersModel.findByIdAndUpdate(id, updateUserInput);
        }
        return "Success";
    }
    async passwordUser(id, updatePasswordUser) {
        const salt = await (0, bcryptjs_1.genSalt)();
        const hashed = await (0, bcryptjs_1.hash)(updatePasswordUser.password, salt);
        await this.UsersModel.findByIdAndUpdate(id, { password: hashed, refreshToken: null });
        return "Success";
    }
    async state(stateInput) {
        await this.UsersModel.findByIdAndUpdate(stateInput.id, stateInput).exec();
        return "Success";
    }
    async remove(id) {
        const result = await this.UsersModel.findOne({ _id: id }, { image: 1, _id: 0 });
        await this.favoritesService.remove(id);
        await this.walletsService.remove(id);
        await this.addressesService.clean(id);
        await this.UsersModel.findByIdAndDelete(id);
        if (result?.image)
            this.awsService.removeImage(result?.image);
        return "user has been deleted";
    }
    async findDeviceToken(_id) {
        return this.UsersModel.findOne({ _id }, { deviceToken: 1, _id: 0 });
    }
    async login(loginUserInput) {
        const user = await this.UsersModel.login(loginUserInput);
        if (user?.image)
            user.image = this.awsService.getUrl(user?.image);
        return user;
    }
    async create(createUserInput) {
        const user = new this.UsersModel(createUserInput);
        const wallet = await this.walletsService.create({ user: user._id });
        user.wallet = wallet._id;
        await user.save();
        await this.favoritesService.create({ user: user._id });
        return user.populate({ path: "wallet", select: { points: 1, amount: 1, _id: 0 } });
    }
    async findByType(_id, type) {
        const user = await this.UsersModel.findOne({ $and: [{ _id }, { type }] }).exec();
        if (user?.image)
            user.image = this.awsService.getUrl(user?.image);
        return user;
    }
    findWallet(id) {
        return this.UsersModel.findOne({ _id: id }, { wallet: 1, _id: 0 });
    }
    async info(phoneNumber) {
        const user = await this.UsersModel.findOne({ phoneNumber }, { name: 1, wallet: 1, phoneNumber: 1, type: 1, city: 1, image: 1, _id: 0 }).populate({ path: "wallet", select: { points: 1, amount: 1, _id: 0 } });
        if (user?.image)
            user.image = this.awsService.getUrl(user?.image);
        return user;
    }
    async update(updateUserInfo) {
        if (updateUserInfo?.phoneNumber) {
            let E0011 = await this.findByPhoneNumber(updateUserInfo.phoneNumber);
            if (!E0011)
                throw new common_1.BadRequestException('phoneNumber E0011');
        }
        if (updateUserInfo?.email) {
            let E0002 = await this.findByEmail(updateUserInfo.email);
            if (E0002 && updateUserInfo.phoneNumber != E0002.phoneNumber)
                throw new common_1.BadRequestException('email E0002');
        }
        if (updateUserInfo?.image) {
            const { image } = await this.UsersModel.findOne({ phoneNumber: updateUserInfo.phoneNumber }, { image: 1, _id: 0 });
            if (image)
                this.awsService.removeImage(image);
        }
        await this.UsersModel.findOneAndUpdate({ phoneNumber: updateUserInfo.phoneNumber }, updateUserInfo);
        return "Success";
    }
    async password(phoneNumber, passwordUserInput) {
        const user = await this.findByPhoneNumber(phoneNumber);
        const checkPassword = await user.comparePassword(passwordUserInput.oldPassword);
        if (checkPassword) {
            const salt = await (0, bcryptjs_1.genSalt)();
            const hashed = await (0, bcryptjs_1.hash)(passwordUserInput.password, salt);
            await this.UsersModel.findOneAndUpdate({ phoneNumber }, { password: hashed }).exec();
            return "Success";
        }
        else
            throw new common_1.BadRequestException('password E0005');
    }
    async logout(phoneNumber) {
        await this.UsersModel.findOneAndUpdate({ phoneNumber }, { refreshToken: null });
    }
    async delete(id) {
        await this.UsersModel.findByIdAndUpdate(id, { state: 'Deleted' }).exec();
        return "Success";
    }
    async getCreatedAt(_id) {
        return this.UsersModel.findOne({ _id }, { createdAt: 1 });
    }
    async findByPhoneNumber(phoneNumber) {
        const user = await this.UsersModel.findOne({ phoneNumber }).exec();
        if (user?.image)
            user.image = this.awsService.getUrl(user?.image);
        return user;
    }
    async findByEmail(email) {
        const user = await this.UsersModel.findOne({ email }).exec();
        if (user?.image)
            user.image = this.awsService.getUrl(user?.image);
        return user;
    }
    async updateAny(phoneNumber, updateUserInput) {
        await this.UsersModel.findOneAndUpdate({ phoneNumber }, updateUserInput);
        return { message: "account updated" };
    }
    async findId(phoneNumber) {
        const user = await this.UsersModel.findOne({ phoneNumber }, { _id: 1, deviceToken: 1 });
        if (!user)
            throw new common_1.BadRequestException("There isn't user regestered with this phone number");
        return user;
    }
    async home() {
        const users = await this.UsersModel.countDocuments();
        const recentlyUsers = await this.UsersModel.find().sort({ _id: -1 }).limit(10).select(["name", "image", "phoneNumber"]);
        for (const single of recentlyUsers) {
            if (single?.image)
                single.image = this.awsService.getUrl(single.image);
        }
        return { users, recentlyUsers };
    }
    async usersReport(date) {
        const year = new Date(date);
        let result = declearedMonths_1.months;
        const users = await this.UsersModel.aggregate([
            { $match: { $and: [{ createdAt: { $gte: year } }, { createdAt: { $lte: new Date() } }] } },
            { $group: { _id: "createAt", total: { $push: "$createdAt" }, } },
        ]);
        if (users?.length) {
            for (const single of users[0]?.total) {
                result = { ...result, [`m${new Date(single).getMonth()}`]: { ...result[`m${new Date(single).getMonth()}`], [`d${new Date(single).getDate()}`]: result[`m${new Date(single).getMonth()}`][`d${new Date(single).getDate()}`] + 1 } };
            }
        }
        return result;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Users")),
    __metadata("design:paramtypes", [Object, aws_service_1.AwsService,
        favorites_service_1.FavoritesService,
        wallets_service_1.WalletsService,
        addresses_service_1.AddressesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map