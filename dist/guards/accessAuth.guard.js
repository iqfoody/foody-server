"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
let AccessAuthGuard = class AccessAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const handler = ctx.getHandler();
        if (request.cookies.osk) {
            const access = request.cookies.osk;
            request.body = { ...request.body, access, handler };
        }
        else if (request.headers.authorization) {
            const access = request.headers.authorization.replace('Bearer', '').trim();
            request.body = { ...request.body, access, handler };
        }
        else
            throw new common_1.UnauthorizedException("Access denied");
        return request;
    }
};
AccessAuthGuard = __decorate([
    (0, common_1.Injectable)()
], AccessAuthGuard);
exports.AccessAuthGuard = AccessAuthGuard;
//# sourceMappingURL=accessAuth.guard.js.map