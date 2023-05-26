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
exports.FavoritesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const favorites_service_1 = require("./favorites.service");
const favorite_entity_1 = require("./entities/favorite.entity");
const create_favorite_input_1 = require("./dto/create-favorite.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
let FavoritesResolver = class FavoritesResolver {
    favoritesService;
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    createFavorite(createFavoriteInput) {
        return this.favoritesService.create(createFavoriteInput);
    }
    findAll() {
        return this.favoritesService.findAll();
    }
    findOne(id) {
        return this.favoritesService.findOne(id);
    }
    removeFavorite(id) {
        return this.favoritesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => favorite_entity_1.Favorite),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: favorite_entity_1.Favorite }),
    __param(0, (0, graphql_1.Args)('createFavoriteInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favorite_input_1.CreateFavoriteInput]),
    __metadata("design:returntype", void 0)
], FavoritesResolver.prototype, "createFavorite", null);
__decorate([
    (0, graphql_1.Query)(() => [favorite_entity_1.Favorite], { name: 'favorites' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: favorite_entity_1.Favorite }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FavoritesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => favorite_entity_1.Favorite, { name: 'favorite' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: favorite_entity_1.Favorite }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavoritesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => favorite_entity_1.Favorite),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: favorite_entity_1.Favorite }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavoritesResolver.prototype, "removeFavorite", null);
FavoritesResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => favorite_entity_1.Favorite),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesResolver);
exports.FavoritesResolver = FavoritesResolver;
//# sourceMappingURL=favorites.resolver.js.map