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
const user_entity_1 = require("../users/entities/user.entity");
const mongo2js_1 = require("@ucast/mongo2js");
const admin_entity_1 = require("../admins/entities/admin.entity");
const driver_entity_1 = require("../drivers/entities/driver.entity");
const address_entity_1 = require("../addresses/entities/address.entity");
const favorite_entity_1 = require("../favorites/entities/favorite.entity");
const feedback_entity_1 = require("../feedbacks/entities/feedback.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const promo_code_entity_1 = require("../promo-codes/entities/promo-code.entity");
const rate_entity_1 = require("../rates/entities/rate.entity");
var Actions;
(function (Actions) {
    Actions["Manage"] = "manage";
    Actions["Create"] = "create";
    Actions["Update"] = "update";
    Actions["Read"] = "read";
    Actions["Delete"] = "delete";
    Actions["Search"] = "search";
    Actions["Info"] = "info";
    Actions["UpdateInfo"] = "updateInfo";
    Actions["Add"] = "add";
    Actions["Edit"] = "edit";
    Actions["Remove"] = "remove";
    Actions["State"] = "state";
    Actions["Self"] = "self";
    Actions["Password"] = "password";
    Actions["Refresh"] = "refresh";
    Actions["Complete"] = "complete";
})(Actions = exports.Actions || (exports.Actions = {}));
exports.conditionsMatcher = (0, ability_1.buildMongoQueryMatcher)({ $eq: mongo2js_1.$eq }, { eq: mongo2js_1.eq });
const fieldMatcher = fields => field => fields.includes(field);
exports.fieldMatcher = fieldMatcher;
let AbilityFactory = class AbilityFactory {
    defineAbility(user) {
        const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.PureAbility);
        if (user.metadata === 'User') {
            can([Actions.Info, Actions.UpdateInfo, Actions.Password, Actions.Refresh], user_entity_1.User);
            can([Actions.Info, Actions.Edit, Actions.Add, Actions.Remove], address_entity_1.Address);
            can([Actions.Info, Actions.Edit], favorite_entity_1.Favorite);
            can(Actions.Read, feedback_entity_1.Feedback);
            can([Actions.Info, Actions.Edit, Actions.Add, Actions.Remove], order_entity_1.Order);
            can([Actions.Info, Actions.Edit], promo_code_entity_1.PromoCode);
            can(Actions.Add, rate_entity_1.Rate);
        }
        else if (user.metadata === 'Driver') {
            can([Actions.Info, Actions.UpdateInfo, Actions.Password, Actions.Refresh], driver_entity_1.Driver);
            can([Actions.Read, Actions.Complete], driver_entity_1.Driver);
        }
        else if (user.metadata === 'Admin') {
            if (user.type === "Admin") {
                can(Actions.Manage, 'all');
            }
            else if (user.type === "Data Entery") {
                can([Actions.Read, Actions.Delete], feedback_entity_1.Feedback);
                can(Actions.Manage, admin_entity_1.Admin);
            }
            else if (user.type === "Accounter") {
            }
            else if (user.type === "Human Resources") {
            }
            else if (user.type === "Support") {
            }
            else if (user.type === "Store Keeper") {
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