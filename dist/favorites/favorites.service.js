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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let FavoritesService = class FavoritesService {
    FavoritesModel;
    usersService;
    constructor(FavoritesModel, usersService) {
        this.FavoritesModel = FavoritesModel;
        this.usersService = usersService;
    }
    create(createFavoriteInput) {
        return this.FavoritesModel.create(createFavoriteInput);
    }
    findAll() {
        return this.FavoritesModel.find();
    }
    findOne(id) {
        return this.FavoritesModel.findById(id);
    }
    async findFavorite(phoneNumber) {
        const { _id } = await this.usersService.findId(phoneNumber);
        return this.FavoritesModel.findOne({ user: _id }, { meals: 1, restaurants: 1, _id: 0 }).populate([{ path: "meals", select: { title: 1, titleEN: 1, titleKR: 1, image: 1 } }, { path: "restaurants", select: { title: 1, titleEN: 1, titleKR: 1, time: 1, image: 1, rate: 1, rating: 1 } }]);
    }
    async addFavorite(updateFavoriteInput, phoneNumber) {
        const { _id } = await this.usersService.findId(phoneNumber);
        const favorite = await this.FavoritesModel.findOne({ user: _id });
        if (!favorite)
            throw new common_1.NotFoundException('favorites not found');
        if (updateFavoriteInput.type === "Meal") {
            if (!updateFavoriteInput?.meal)
                throw new common_1.BadRequestException("meal required");
            if (!(0, mongoose_2.isValidObjectId)(updateFavoriteInput.meal))
                throw new common_1.BadRequestException("There isn't meal with this id");
            let meals = favorite?.meals;
            const index = favorite?.meals?.findIndex(id => id == _id);
            if (index === -1) {
                meals.push(updateFavoriteInput.meal);
            }
            else {
                meals = meals?.filter(id => id !== updateFavoriteInput.meal);
            }
            await this.FavoritesModel.findByIdAndUpdate(favorite._id, { meals });
        }
        else if (updateFavoriteInput.type === "Restaurant") {
            if (!updateFavoriteInput?.restaurant)
                throw new common_1.BadRequestException("restaurant required");
            if (!(0, mongoose_2.isValidObjectId)(updateFavoriteInput.restaurant))
                throw new common_1.BadRequestException("There isn't restaurant with this id");
            let restaurants = favorite.restaurants;
            const index = favorite.restaurants.findIndex(id => id == _id);
            if (index === -1) {
                restaurants.push(updateFavoriteInput.restaurant);
            }
            else {
                restaurants = restaurants.filter(id => id !== updateFavoriteInput.restaurant);
            }
            await this.FavoritesModel.findByIdAndUpdate(favorite._id, { restaurants });
        }
        return "Success";
    }
    async remove(id) {
        await this.FavoritesModel.findByIdAndDelete(id);
        return "Success";
    }
};
FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Favorites")),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], FavoritesService);
exports.FavoritesService = FavoritesService;
//# sourceMappingURL=favorites.service.js.map