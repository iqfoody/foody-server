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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const aws_service_1 = require("../aws/aws.service");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const platform_express_1 = require("@nestjs/platform-express");
const category_entity_1 = require("./entities/category.entity");
const create_category_input_1 = require("./dto/create-category.input");
const update_category_input_1 = require("./dto/update-category.input");
const meals_service_1 = require("../meals/meals.service");
let CategoriesController = class CategoriesController {
    categoriesService;
    mealsService;
    awsService;
    constructor(categoriesService, mealsService, awsService) {
        this.categoriesService = categoriesService;
        this.mealsService = mealsService;
        this.awsService = awsService;
    }
    async getRestaurantsForCategory(category, orderby) {
        return this.mealsService.findForCategory(category, orderby);
    }
    async getCategories() {
        return this.categoriesService.findCategories();
    }
    async createCategory(createCategoryInput, file) {
        return this.categoriesService.create(createCategoryInput, file);
    }
    async updateCategory(updateCategoryInput, file) {
        const result = await this.awsService.createImage(file, updateCategoryInput.id);
        return this.categoriesService.update(updateCategoryInput.id, { ...updateCategoryInput, image: result?.Key });
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('orderBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getRestaurantsForCategory", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: category_entity_1.Category }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_input_1.CreateCategoryInput, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: category_entity_1.Category }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_input_1.UpdateCategoryInput, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        meals_service_1.MealsService,
        aws_service_1.AwsService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map