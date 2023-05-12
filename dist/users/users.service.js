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
let UsersService = class UsersService {
    constructor(UsersModel, awsService, favoritesService, walletsService) {
        this.UsersModel = UsersModel;
        this.awsService = awsService;
        this.favoritesService = favoritesService;
        this.walletsService = walletsService;
    }
    async search(searchUsersInput) {
        const LIMIT = 8;
        const startIndex = (searchUsersInput.page) * LIMIT;
        const search = new RegExp(searchUsersInput.query, 'i');
        const users = await this.UsersModel.find({ $or: [{ email: search }, { name: search }, { phoneNumber: search }] }).limit(LIMIT).skip(startIndex);
        const total = await this.UsersModel.countDocuments();
        for (const user of users) {
            if (user === null || user === void 0 ? void 0 : user.image)
                user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        }
        return { data: users, pages: Math.ceil(total / LIMIT) };
    }
    async findAllUsers(limitEntity) {
        const startIndex = limitEntity.page * limitEntity.limit;
        const users = await this.UsersModel.find().limit(limitEntity.limit).skip(startIndex).sort({ _id: -1 });
        const total = await this.UsersModel.countDocuments();
        for (const user of users) {
            if (user === null || user === void 0 ? void 0 : user.image)
                user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        }
        return { data: users, pages: Math.ceil(total / limitEntity.limit) };
    }
    async findAll() {
        const users = await this.UsersModel.find().exec();
        for (const user of users) {
            if (user === null || user === void 0 ? void 0 : user.image)
                user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        }
        return users;
    }
    async findOne(id) {
        const user = await this.UsersModel.findById(id).populate("wallet");
        if (user === null || user === void 0 ? void 0 : user.image)
            user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        return user;
    }
    async createUser(createUserInput) {
        const wallet = await this.walletsService.create();
        const user = new this.UsersModel(Object.assign(Object.assign({}, createUserInput), { wallet: wallet._id }));
        await user.save();
        await this.favoritesService.create({ user: user._id });
        if (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.image)
            user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        return user.populate("wallet");
    }
    async updateUser(id, updateUserInput) {
        if (updateUserInput === null || updateUserInput === void 0 ? void 0 : updateUserInput.phoneNumber) {
            let E0011 = await this.findByPhoneNumber(updateUserInput.phoneNumber);
            if (E0011 && id != E0011._id)
                throw new common_1.BadRequestException('phoneNumber E0011');
        }
        if (updateUserInput === null || updateUserInput === void 0 ? void 0 : updateUserInput.email) {
            let E0002 = await this.findByEmail(updateUserInput.email);
            if (E0002 && id != E0002._id)
                throw new common_1.BadRequestException('email E0002');
        }
        if (updateUserInput === null || updateUserInput === void 0 ? void 0 : updateUserInput.image) {
            const { image } = await this.UsersModel.findOne({ _id: id }, { image: 1, _id: 0 });
            if (image)
                this.awsService.removeImage(image);
        }
        await this.UsersModel.findByIdAndUpdate(id, updateUserInput);
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
        const { image } = await this.UsersModel.findOne({ _id: id }, { image: 1, _id: 0 });
        await this.UsersModel.findByIdAndDelete(id);
        await this.favoritesService.remove(id);
        await this.walletsService.remove(id);
        if (image)
            this.awsService.removeImage(image);
        return "user has been deleted";
    }
    async login(loginUserInput) {
        const user = await this.UsersModel.login(loginUserInput);
        if (user === null || user === void 0 ? void 0 : user.image)
            user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        return user;
    }
    async create(createUserInput) {
        const wallet = await this.walletsService.create();
        const user = new this.UsersModel(Object.assign(Object.assign({}, createUserInput), { wallet: wallet._id }));
        await user.save();
        await this.favoritesService.create({ user: user._id });
        if (createUserInput === null || createUserInput === void 0 ? void 0 : createUserInput.image)
            user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        return user.populate({ path: "wallet", select: { points: 1, amount: 1, _id: 0 } });
    }
    async findByType(_id, type) {
        const user = await this.UsersModel.findOne({ $and: [{ _id }, { type }] }).exec();
        if (user === null || user === void 0 ? void 0 : user.image)
            user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        return user;
    }
    findWallet(id) {
        return this.UsersModel.findOne({ _id: id }, { wallet: 1, _id: 0 });
    }
    async info(id) {
        const user = await this.UsersModel.findOne({ _id: id }, { name: 1, wallet: 1, phoneNumber: 1, type: 1, city: 1, image: 1, _id: 0 }).populate({ path: "wallet", select: { points: 1, amount: 1, _id: 0 } });
        if (user === null || user === void 0 ? void 0 : user.image)
            user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        return user;
    }
    async update(id, updateUserInfo) {
        if (updateUserInfo === null || updateUserInfo === void 0 ? void 0 : updateUserInfo.phoneNumber) {
            let E0011 = await this.findByPhoneNumber(updateUserInfo.phoneNumber);
            if (E0011 && id != E0011._id) {
                throw new common_1.BadRequestException('phoneNumber E0011');
            }
        }
        if (updateUserInfo === null || updateUserInfo === void 0 ? void 0 : updateUserInfo.email) {
            let E0002 = await this.findByEmail(updateUserInfo.email);
            if (E0002 && id != E0002._id)
                throw new common_1.BadRequestException('email E0002');
        }
        if (updateUserInfo === null || updateUserInfo === void 0 ? void 0 : updateUserInfo.image) {
            const { image } = await this.UsersModel.findOne({ _id: id }, { image: 1, _id: 0 });
            if (image)
                this.awsService.removeImage(image);
        }
        await this.UsersModel.findByIdAndUpdate(id, updateUserInfo);
        return "Success";
    }
    async password(id, passwordUserInput) {
        const user = await this.findOne(id);
        const checkPassword = await user.comparePassword(passwordUserInput.oldPassword);
        if (checkPassword) {
            const salt = await (0, bcryptjs_1.genSalt)();
            const hashed = await (0, bcryptjs_1.hash)(passwordUserInput.password, salt);
            await this.UsersModel.findByIdAndUpdate(id, { password: hashed }).exec();
            return "Success";
        }
        else {
            throw new common_1.BadRequestException('password E0005');
        }
    }
    async logout(id) {
        await this.UsersModel.findByIdAndUpdate(id, { refreshToken: null });
    }
    async refresh(id, token) {
        const user = await this.UsersModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('Access Denied');
        const isMatched = user.compareToken(token);
        if (!isMatched)
            throw new common_1.ForbiddenException('Access Denied');
        return user;
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
        if (user === null || user === void 0 ? void 0 : user.image)
            user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        return user;
    }
    async findByEmail(email) {
        const user = await this.UsersModel.findOne({ email }).exec();
        if (user === null || user === void 0 ? void 0 : user.image)
            user.image = this.awsService.getUrl(user === null || user === void 0 ? void 0 : user.image);
        return user;
    }
    async updateAny(id, updateUserInput) {
        await this.UsersModel.findByIdAndUpdate(id, updateUserInput);
        return { message: "account updated" };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Users")),
    __metadata("design:paramtypes", [Object, aws_service_1.AwsService,
        favorites_service_1.FavoritesService,
        wallets_service_1.WalletsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map