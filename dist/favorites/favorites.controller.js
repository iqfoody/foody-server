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
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const favorites_service_1 = require("./favorites.service");
const ability_decorator_1 = require("../ability/ability.decorator");
const favorite_entity_1 = require("./entities/favorite.entity");
const ability_factory_1 = require("../ability/ability.factory");
const update_favorite_input_1 = require("./dto/update-favorite.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
let FavoritesController = class FavoritesController {
    favoritesService;
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    async getFavorites(context) {
        return this.favoritesService.findFavorite(context.user._id);
    }
    async updateFavorite(updateFavoriteInput, context) {
        console.log(updateFavoriteInput);
        return this.favoritesService.addFavorite(updateFavoriteInput, context.user._id);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Info, subject: favorite_entity_1.Favorite }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Edit, subject: favorite_entity_1.Favorite }),
    __param(0, (0, common_1.Body)('updateFavoriteInput')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_favorite_input_1.UpdateFavoriteInput, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "updateFavorite", null);
FavoritesController = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
exports.FavoritesController = FavoritesController;
//# sourceMappingURL=favorites.controller.js.map