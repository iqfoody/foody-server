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
const create_search_input_1 = require("./dto/create-search.input");
const update_search_input_1 = require("./dto/update-search.input");
let SearchesResolver = class SearchesResolver {
    constructor(searchesService) {
        this.searchesService = searchesService;
    }
    createSearch(createSearchInput) {
        return this.searchesService.create(createSearchInput);
    }
    findAll() {
        return this.searchesService.findAll();
    }
    findOne(id) {
        return this.searchesService.findOne(id);
    }
    updateSearch(updateSearchInput) {
        return this.searchesService.update(updateSearchInput.id, updateSearchInput);
    }
    removeSearch(id) {
        return this.searchesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => search_entity_1.Search),
    __param(0, (0, graphql_1.Args)('createSearchInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_search_input_1.CreateSearchInput]),
    __metadata("design:returntype", void 0)
], SearchesResolver.prototype, "createSearch", null);
__decorate([
    (0, graphql_1.Query)(() => [search_entity_1.Search], { name: 'searches' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SearchesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => search_entity_1.Search, { name: 'search' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SearchesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => search_entity_1.Search),
    __param(0, (0, graphql_1.Args)('updateSearchInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_search_input_1.UpdateSearchInput]),
    __metadata("design:returntype", void 0)
], SearchesResolver.prototype, "updateSearch", null);
__decorate([
    (0, graphql_1.Mutation)(() => search_entity_1.Search),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SearchesResolver.prototype, "removeSearch", null);
SearchesResolver = __decorate([
    (0, graphql_1.Resolver)(() => search_entity_1.Search),
    __metadata("design:paramtypes", [searches_service_1.SearchesService])
], SearchesResolver);
exports.SearchesResolver = SearchesResolver;
//# sourceMappingURL=searches.resolver.js.map