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
exports.TagsController = void 0;
const common_1 = require("@nestjs/common");
const tags_service_1 = require("./tags.service");
const aws_service_1 = require("../aws/aws.service");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const platform_express_1 = require("@nestjs/platform-express");
const create_tag_input_1 = require("./dto/create-tag.input");
const update_tag_input_1 = require("./dto/update-tag.input");
const tag_entity_1 = require("./entities/tag.entity");
let TagsController = class TagsController {
    constructor(tagsService, awsService) {
        this.tagsService = tagsService;
        this.awsService = awsService;
    }
    async getTags() {
        return this.tagsService.findTags();
    }
    async getTag(tag) {
        return this.tagsService.findTag(tag);
    }
    async createTag(createTagInput, file) {
        return this.tagsService.create(createTagInput, file);
    }
    async updateTag(updateTagInput, file) {
        const result = await this.awsService.createImage(file, updateTagInput.id);
        return this.tagsService.update(updateTagInput.id, Object.assign(Object.assign({}, updateTagInput), { image: result === null || result === void 0 ? void 0 : result.Key }));
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "getTags", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "getTag", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: tag_entity_1.Tag }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)('createTagInput')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_input_1.CreateTagInput, Object]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "createTag", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: tag_entity_1.Tag }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)('updateTagInput')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tag_input_1.UpdateTagInput, Object]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "updateTag", null);
TagsController = __decorate([
    (0, common_1.Controller)('tags'),
    __metadata("design:paramtypes", [tags_service_1.TagsService,
        aws_service_1.AwsService])
], TagsController);
exports.TagsController = TagsController;
//# sourceMappingURL=tags.controller.js.map