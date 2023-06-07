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
exports.SettingsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const settings_service_1 = require("./settings.service");
const setting_entity_1 = require("./entities/setting.entity");
const create_setting_input_1 = require("./dto/create-setting.input");
const update_setting_input_1 = require("./dto/update-setting.input");
const accessAuth_guard_1 = require("../guards/accessAuth.guard");
const common_1 = require("@nestjs/common");
const ability_decorator_1 = require("../ability/ability.decorator");
const ability_factory_1 = require("../ability/ability.factory");
let SettingsResolver = class SettingsResolver {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    createSetting(createSettingInput) {
        return this.settingsService.create(createSettingInput);
    }
    findAll() {
        return this.settingsService.findAll();
    }
    findSupport() {
        return this.settingsService.findSupport();
    }
    findOne(id) {
        return this.settingsService.findOne(id);
    }
    updateSetting(updateSettingInput) {
        return this.settingsService.update(updateSettingInput.id, updateSettingInput);
    }
    removeSetting(id) {
        return this.settingsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => setting_entity_1.Setting),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Create, subject: setting_entity_1.Setting }),
    __param(0, (0, graphql_1.Args)('createSettingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_setting_input_1.CreateSettingInput]),
    __metadata("design:returntype", void 0)
], SettingsResolver.prototype, "createSetting", null);
__decorate([
    (0, graphql_1.Query)(() => [setting_entity_1.Setting], { name: 'settings' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: setting_entity_1.Setting }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => setting_entity_1.Setting, { name: 'support' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: setting_entity_1.Setting }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsResolver.prototype, "findSupport", null);
__decorate([
    (0, graphql_1.Query)(() => setting_entity_1.Setting, { name: 'setting' }),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Read, subject: setting_entity_1.Setting }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Update, subject: setting_entity_1.Setting }),
    __param(0, (0, graphql_1.Args)('updateSettingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_setting_input_1.UpdateSettingInput]),
    __metadata("design:returntype", void 0)
], SettingsResolver.prototype, "updateSetting", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, ability_decorator_1.CheckAbilities)({ actions: ability_factory_1.Actions.Delete, subject: setting_entity_1.Setting }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingsResolver.prototype, "removeSetting", null);
SettingsResolver = __decorate([
    (0, common_1.UseGuards)(accessAuth_guard_1.AccessAuthGuard),
    (0, graphql_1.Resolver)(() => setting_entity_1.Setting),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsResolver);
exports.SettingsResolver = SettingsResolver;
//# sourceMappingURL=settings.resolver.js.map