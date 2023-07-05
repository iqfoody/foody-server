"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityFactory = exports.fieldMatcher = exports.conditionsMatcher = exports.Actions = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const mongo2js_1 = require("@ucast/mongo2js");
var Actions;
(function (Actions) {
    Actions["Manage"] = "manage";
    Actions["Create"] = "Create";
    Actions["Update"] = "Update";
    Actions["Read"] = "Read";
    Actions["Delete"] = "Delete";
})(Actions = exports.Actions || (exports.Actions = {}));
exports.conditionsMatcher = (0, ability_1.buildMongoQueryMatcher)({ $eq: mongo2js_1.$eq }, { eq: mongo2js_1.eq });
const fieldMatcher = fields => field => fields.includes(field);
exports.fieldMatcher = fieldMatcher;
let AbilityFactory = class AbilityFactory {
    defineAbility(user) {
        const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.PureAbility);
        if (user.metadata === 'Admin') {
            if (user.type === "Admin") {
                can(Actions.Manage, 'all');
            }
            else if (user.type === "Sub Admin") {
                can(Actions.Read, "Notification");
                user.permissions.map(item => can(item.abilities, item.object));
            }
        }
        return build({
            detectSubjectType: (item) => item.constructor,
            conditionsMatcher: exports.conditionsMatcher,
            fieldMatcher: exports.fieldMatcher
        });
    }
};
AbilityFactory = __decorate([
    (0, common_1.Injectable)()
], AbilityFactory);
exports.AbilityFactory = AbilityFactory;
//# sourceMappingURL=ability.factory.js.map