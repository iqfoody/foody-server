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
exports.LocalStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const auth_service_1 = require("../auth/auth.service");
const firebase_service_1 = require("../firebase/firebase.service");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'local') {
    authService;
    firebaseService;
    constructor(authService, firebaseService) {
        super({
            passReqToCallback: true,
        });
        this.authService = authService;
        this.firebaseService = firebaseService;
    }
    async validate(request) {
        if (request.headers.authorization) {
            const token = request.headers.authorization.replace('Bearer', '').trim();
            if (!token)
                throw new common_1.UnauthorizedException('Access Denied');
            const phoneNumber = await this.firebaseService.checkAuth(token);
            console.log(phoneNumber);
            const user = await this.authService.validateUser(phoneNumber);
            if (!user)
                throw new common_1.UnauthorizedException('Access Denied');
            return user;
        }
        else
            throw new common_1.UnauthorizedException('Access Denied');
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        firebase_service_1.FirebaseService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map