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
exports.SearchesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const searches_service_1 = require("./searches.service");
const search_entity_1 = require("./entities/search.entity");
const searchQuery_input_1 = require("../constants/searchQuery.input");
const user_entity_1 = require("../users/entities/user.entity");
const ability_factory_1 = require("../ability/ability.factory");
const ability_decorator_1 = require("../ability/ability.decorator");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const usersResponse_entity_1 = require("../users/entities/usersResponse.entity");
let SearchesResolver = class SearchesResolver {
    searchesService;
    usersService;
    constructor(searchesService, usersService) {
        this.searchesService = searchesService;
        this.usersService = usersService;
    }
    findAll(searchQuery) {
        return this.usersService.search(searchQuery);
    }
    findOne(id) {
        return this.searchesService.findOne(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => usersResponse_entity_1.UsersResponse, { name: 'searchUsers' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Search, subject: user_entity_1.User }),
    __param(0, (0, graphql_1.Args)("searchQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchQuery_input_1.SearchInput]),
    __metadata("design:returntype", void 0)
], SearchesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => search_entity_1.Search, { name: 'search' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SearchesResolver.prototype, "findOne", null);
SearchesResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => search_entity_1.Search),
    __metadata("design:paramtypes", [searches_service_1.SearchesService,
        users_service_1.UsersService])
], SearchesResolver);
exports.SearchesResolver = SearchesResolver;
//# sourceMappingURL=searches.resolver.js.map