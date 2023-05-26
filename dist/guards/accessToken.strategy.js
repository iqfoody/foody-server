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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenStrategy = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const ability_factory_1 = require("../ability/ability.factory");
const ability_decorator_1 = require("../ability/ability.decorator");
let AccessTokenStrategy = class AccessTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    reflector;
    caslAbilityFactory;
    constructor(reflector, caslAbilityFactory) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField('access'),
            secretOrKey: process.env.ACCESS_TOKEN_USERS,
            passReqToCallback: true,
        });
        this.reflector = reflector;
        this.caslAbilityFactory = caslAbilityFactory;
    }
    async validate(req, payload) {
        const handler = req.body.handler;
        const rules = this.reflector.get(ability_decorator_1.CHECK_ABILITY, handler) || [];
        const ability = this.caslAbilityFactory.defineAbility(payload);
        try {
            const canAccess = rules.every((rule) => ability.relevantRuleFor(rule.actions, rule.subject, rule?.field));
            if (canAccess) {
                return payload;
            }
            throw new common_1.ForbiddenException("Access Denied");
        }
        catch (err) {
            throw new common_1.ForbiddenException(err.message);
        }
    }
};
AccessTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        ability_factory_1.AbilityFactory])
], AccessTokenStrategy);
exports.AccessTokenStrategy = AccessTokenStrategy;
//# sourceMappingURL=accessToken.strategy.js.map