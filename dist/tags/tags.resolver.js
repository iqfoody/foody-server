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
exports.TagsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tags_service_1 = require("./tags.service");
const tag_entity_1 = require("./entities/tag.entity");
const create_tag_input_1 = require("./dto/create-tag.input");
const update_tag_input_1 = require("./dto/update-tag.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const state_input_1 = require("../constants/state.input");
const position_input_1 = require("../constants/position.input");
let TagsResolver = class TagsResolver {
    tagsService;
    constructor(tagsService) {
        this.tagsService = tagsService;
    }
    createTag(createTagInput) {
        return this.tagsService.create(createTagInput, null);
    }
    findAll() {
        return this.tagsService.findAll();
    }
    findOne(id) {
        return this.tagsService.findOne(id);
    }
    updateTag(updateTagInput) {
        return this.tagsService.update(updateTagInput.id, updateTagInput);
    }
    stateTag(stateInput) {
        return this.tagsService.state(stateInput);
    }
    positionTag(updatePositionInput) {
        return this.tagsService.position(updatePositionInput);
    }
    removeTag(id) {
        return this.tagsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => tag_entity_1.Tag),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: tag_entity_1.Tag }),
    __param(0, (0, graphql_1.Args)('createTagInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_input_1.CreateTagInput]),
    __metadata("design:returntype", void 0)
], TagsResolver.prototype, "createTag", null);
__decorate([
    (0, graphql_1.Query)(() => [tag_entity_1.Tag], { name: 'tags' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: tag_entity_1.Tag }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TagsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => tag_entity_1.Tag, { name: 'tag' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: tag_entity_1.Tag }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: tag_entity_1.Tag }),
    __param(0, (0, graphql_1.Args)('updateTagInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tag_input_1.UpdateTagInput]),
    __metadata("design:returntype", void 0)
], TagsResolver.prototype, "updateTag", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: tag_entity_1.Tag }),
    __param(0, (0, graphql_1.Args)('stateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_input_1.StateInput]),
    __metadata("design:returntype", void 0)
], TagsResolver.prototype, "stateTag", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: tag_entity_1.Tag }),
    __param(0, (0, graphql_1.Args)('updatePositionInput', { type: () => [position_input_1.UpdatePositionInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], TagsResolver.prototype, "positionTag", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: tag_entity_1.Tag }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagsResolver.prototype, "removeTag", null);
TagsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => tag_entity_1.Tag),
    __metadata("design:paramtypes", [tags_service_1.TagsService])
], TagsResolver);
exports.TagsResolver = TagsResolver;
//# sourceMappingURL=tags.resolver.js.map