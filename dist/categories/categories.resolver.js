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
exports.CategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const categories_service_1 = require("./categories.service");
const category_entity_1 = require("./entities/category.entity");
const update_category_input_1 = require("./dto/update-category.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const state_input_1 = require("../constants/state.input");
const position_input_1 = require("../constants/position.input");
const create_category_input_1 = require("./dto/create-category.input");
const mongoose_1 = require("mongoose");
let CategoriesResolver = class CategoriesResolver {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    createCategory(createCategoryInput) {
        return this.categoriesService.create(createCategoryInput);
    }
    findAll() {
        return this.categoriesService.findAll();
    }
    findOne(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't category with this id");
        return this.categoriesService.findOne(id);
    }
    updateCategory(updateCategoryInput) {
        if (!(0, mongoose_1.isValidObjectId)(updateCategoryInput?.id))
            throw new common_1.BadRequestException("There isn't category with this id");
        return this.categoriesService.update(updateCategoryInput.id, updateCategoryInput);
    }
    positionCategory(updatePositionInput) {
        return this.categoriesService.position(updatePositionInput);
    }
    stateCategory(stateInput) {
        if (!(0, mongoose_1.isValidObjectId)(stateInput?.id))
            throw new common_1.BadRequestException("There isn't category with this id");
        return this.categoriesService.state(stateInput);
    }
    removeCategory(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new common_1.BadRequestException("There isn't category with this id");
        return this.categoriesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => category_entity_1.Category),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: "Category" }),
    __param(0, (0, graphql_1.Args)('createCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_input_1.CreateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "createCategory", null);
__decorate([
    (0, graphql_1.Query)(() => [category_entity_1.Category], { name: 'categories' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Category" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => category_entity_1.Category, { name: 'category' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: "Category" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_entity_1.Category),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Category" }),
    __param(0, (0, graphql_1.Args)('updateCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_input_1.UpdateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "updateCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Category" }),
    __param(0, (0, graphql_1.Args)('updatePositionInput', { type: () => [position_input_1.UpdatePositionInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "positionCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: "Category" }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "stateCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: "Category" }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "removeCategory", null);
CategoriesResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => category_entity_1.Category),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesResolver);
exports.CategoriesResolver = CategoriesResolver;
//# sourceMappingURL=categories.resolver.js.map