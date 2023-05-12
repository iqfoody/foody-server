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
exports.SearchesService = void 0;
const common_1 = require("@nestjs/common");
const meals_service_1 = require("../meals/meals.service");
const restaurants_service_1 = require("../restaurants/restaurants.service");
let SearchesService = class SearchesService {
    constructor(mealsService, RestaurantsService) {
        this.mealsService = mealsService;
        this.RestaurantsService = RestaurantsService;
    }
    create(createSearchInput) {
        return 'This action adds a new search';
    }
    findAll() {
        return `This action returns all searches`;
    }
    findOne(id) {
        return `This action returns a #${id} search`;
    }
    update(id, updateSearchInput) {
        return `This action updates a #${id} search`;
    }
    remove(id) {
        return `This action removes a #${id} search`;
    }
};
SearchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => meals_service_1.MealsService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => restaurants_service_1.RestaurantsService))),
    __metadata("design:paramtypes", [meals_service_1.MealsService,
        restaurants_service_1.RestaurantsService])
], SearchesService);
exports.SearchesService = SearchesService;
//# sourceMappingURL=searches.service.js.map